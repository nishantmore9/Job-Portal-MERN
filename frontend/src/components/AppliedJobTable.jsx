import React from "react";
import { Table, TableRow, TableCaption, TableHead, TableHeader, TableCell } from "./ui/table";
import { Badge } from "./ui/badge";

const AppliedJobTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        {
          [1,2].map((item,index) => (
            <TableRow key={index}>
              <TableCell>04-8-2024</TableCell>
              <TableCell>Frontend Developer</TableCell>
              <TableCell>Google</TableCell>
              <TableCell className="text-right"><Badge>Selected</Badge></TableCell>
            </TableRow>
          ))
        }
      </Table>
    </div>
  );
};

export default AppliedJobTable;
