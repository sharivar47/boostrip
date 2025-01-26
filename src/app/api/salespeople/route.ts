import { NextResponse } from 'next/server';
import pool from "@/lib/db";
import {ResultSetHeader} from "mysql2";

export async function GET() {
    const [rows] = await pool.query('SELECT * FROM seller');
    return NextResponse.json(rows);
}

export async function POST(request: Request) {
    const { name } = await request.json();
    const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO seller (name) VALUES (?)',
        [name]
    );
    return NextResponse.json({ id: result.insertId, name });
}
