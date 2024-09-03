import { connectToMongoDB } from "@/lib/db";
import Submission from "@/models/submission.model";

interface Params {
  params: {
    [key: string]: string | string[] | undefined;
  };
}

export async function GET(req: Request, { params }: Params) {
  try {
    await connectToMongoDB();
    const { id } = params;

    const result = await Submission.findById(id);

    return Response.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in GET /submissions/:id:", error);

    return Response.json({
      success: false,
      error,
    });
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    await connectToMongoDB();
    const { id } = params;
    const body = await req.json();

    const result = await Submission.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    return Response.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in PATCH /submissions/:id:", error);

    return Response.json({
      success: false,
      error,
    });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    await connectToMongoDB();
    const { id } = params;

    const result = await Submission.findByIdAndDelete(id);

    return Response.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error in DELETE /submissions/:id:", error);

    return Response.json({
      success: false,
      error,
    });
  }
}
