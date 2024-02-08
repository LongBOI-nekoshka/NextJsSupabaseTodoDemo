import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request)
{
    const { id } = await request.json();
    const supabase = createRouteHandlerClient({cookies});
    const { data } = await supabase
    .from("Todo")
    .update({ Is_archived: true, archive_at: Date() + ""})
    .match({ id });
    return NextResponse.json(data);
}

export async function GET(req,res)
{
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q')
    const supabase = createRouteHandlerClient({cookies});
    const { data } = await supabase
    .from("Todo")
    .select()
    .ilike('todo', "%"+query+"%")
    .match({ Is_archived: true});
    return NextResponse.json({data});
}