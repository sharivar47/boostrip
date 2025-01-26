'use client';

import { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem, SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {SelectGroup} from "@radix-ui/react-select";


export default function AdminPage() {
    const [leads, setLeads] = useState([]);
    const [salespeople, setSalespeople] = useState([]);

    useEffect(() => {
        fetch('/api/leads')
            .then((res) => res.json())
            .then(setLeads);
        fetch('/api/salespeople')
            .then((res) => res.json())
            .then(setSalespeople);
    }, []);

    const assignSalesperson = async (leadId: number, salespersonId: number) => {
        await fetch('/api/leads', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ leadId, salespersonId }),
        });
        const updatedLeads = leads.map((lead) =>
            lead.id === leadId ? { ...lead, salespersonId } : lead
        );
        setLeads(updatedLeads);
    };

    return (
        <div className="p-6">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead >Name</TableHead>
                    <TableHead >Email</TableHead>
                    <TableHead >Source</TableHead>
                    <TableHead >Salesperson</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {leads.map((lead) => (
                    <TableRow key={lead.id}>
                        <TableCell>{lead.name}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.source}</TableCell>
                        <TableCell>
                            <Select value={lead.salespersonId || ''}
                                    onValueChange={(value) =>
                                        assignSalesperson(lead.id, parseInt(value))
                                    }>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a seller" />
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectGroup >
                                        <SelectLabel>seller</SelectLabel>
                                        {salespeople.map((sp) => (
                                            <SelectItem key={sp.id} value={sp.id}> {sp.name}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    );
}
