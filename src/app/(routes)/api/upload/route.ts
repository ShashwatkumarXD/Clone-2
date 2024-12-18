import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/config"

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const uploadData = await pinata.upload.file(file, {
        groupId: '0193d832-2cc3-7951-a3c4-b12b1b2d2b7e',
    });
    const fileUrl = `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/files/${uploadData.cid}`;
    return NextResponse.json(fileUrl, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}