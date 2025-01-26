import pool from "@/lib/db";
import {ResultSetHeader} from "mysql2";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, source } = await req.json();
        const [result] = await pool.execute<ResultSetHeader>(
            "INSERT INTO leades (name, email, source) VALUES (?, ?, ?)",
            [name, email, source]
        );
        return new Response(JSON.stringify({ id: result.insertId }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to save lead" }), { status: 500 });
    }
}

export async function GET() {
    try {
        const [leads] = await pool.query(`
            SELECT leades.id, leades.name, leades.email, leades.source, seller.name AS salesperson , seller.id As salespersonId
            FROM leades
            LEFT JOIN seller ON leades.salespersonId = seller.id
        `);
        return new Response(JSON.stringify(leads), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch leads" }), { status: 500 });
    }
}

export async function PUT(request: Request ) {

    const { salespersonId, leadId } = await request.json();

    if (!leadId || !salespersonId) {
        return NextResponse.json({ error: 'Invalid request. ID and salespersonId are required.' , status: 400 });
    }

    try {
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE leades SET salespersonId = ? WHERE id = ?',
            [salespersonId, leadId]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Lead not found.' ,status: 404 });
        }

        return NextResponse.json({ message: 'Lead updated successfully.', leadId: leadId, salespersonId });
    } catch (error) {
        console.error('Error updating lead:', error);
        return NextResponse.json({ error: 'Internal Server Error.' , status: 500 });
    }
}
