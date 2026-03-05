import { NextRequest, NextResponse } from "next/server";
import { runProxy, handleProxyError } from "@/lib/proxy-handler";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, private",
  Pragma: "no-cache",
  Expires: "0",
  "Surrogate-Control": "no-store",
};

export async function GET(request: NextRequest) {
  return proxyRequest(request, undefined);
}

export async function POST(request: NextRequest) {
  const body = await readBody(request);
  return proxyRequest(request, body);
}

export async function PUT(request: NextRequest) {
  const body = await readBody(request);
  return proxyRequest(request, body);
}

export async function PATCH(request: NextRequest) {
  const body = await readBody(request);
  return proxyRequest(request, body);
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request, undefined);
}

async function readBody(request: NextRequest): Promise<unknown> {
  const contentType = request.headers.get("content-type") || "";
  if (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    return await request.formData();
  }
  try {
    const text = await request.text();
    return text ? JSON.parse(text) : undefined;
  } catch {
    return undefined;
  }
}

async function proxyRequest(
  request: NextRequest,
  body: unknown,
): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const service = searchParams.get("service");
  const endpoint = searchParams.get("endpoint");
  const responseType = searchParams.get("responseType") ?? undefined;

  if (!service || !endpoint) {
    return NextResponse.json(
      { error: "Missing service or endpoint" },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  const headers: Record<string, string | string[] | undefined> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  try {
    const result = await runProxy({
      service,
      endpoint,
      responseType: responseType ?? undefined,
      method: request.method,
      headers,
      body,
    });

    if (
      result.headers["content-type"]?.includes("octet-stream") ||
      responseType === "blob"
    ) {
      return new NextResponse(result.data as BodyInit, {
        status: result.status,
        headers: {
          ...NO_STORE_HEADERS,
          ...result.headers,
        },
      });
    }

    return NextResponse.json(result.data, {
      status: result.status,
      headers: NO_STORE_HEADERS,
    });
  } catch (err: unknown) {
    const { status, data } = handleProxyError(err);
    return NextResponse.json(data, {
      status,
      headers: NO_STORE_HEADERS,
    });
  }
}
