export type NFTType =
    | "id_card"
    | "event_pass"
    | "attendance_report"
    | "bunk_pass"
    | "hostel_complaint";

export interface NFTConfig {
    id: NFTType;
    title: string;
    description: string;
    icon: string;
    fields: FieldConfig[];
}

export interface FieldConfig {
    name: string;
    label: string;
    type: "text" | "date" | "number" | "select";
    options?: string[];
    placeholder?: string;
}

export const NFT_TYPES: NFTConfig[] = [
    {
        id: "id_card",
        title: "Digital Student ID",
        description: "Your official digital identity on-chain.",
        icon: "id-card",
        fields: [
            { name: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
            { name: "student_id", label: "Student ID", type: "text", placeholder: "2023CS101" },
            { name: "course", label: "Course", type: "text", placeholder: "B.Tech CSE" },
            { name: "dob", label: "Date of Birth", type: "date" },
            { name: "validity", label: "Valid Until", type: "date" },
        ]
    },
    {
        id: "event_pass",
        title: "Event Pass",
        description: "Access pass for college events.",
        icon: "ticket",
        fields: [
            { name: "event_name", label: "Event Name", type: "text", placeholder: "TechFest 2024" },
            { name: "date", label: "Event Date", type: "date" },
            { name: "venue", label: "Venue", type: "text", placeholder: "Auditorium" },
            { name: "holder_name", label: "Holder Name", type: "text", placeholder: "John Doe" },
        ]
    },
    {
        id: "attendance_report",
        title: "Attendance Report",
        description: "Academic performance record (or lack thereof).",
        icon: "file-bar-chart",
        fields: [
            { name: "student_name", label: "Student Name", type: "text" },
            { name: "subject", label: "Subject", type: "text", placeholder: "Data Structures" },
            { name: "percentage", label: "Attendance %", type: "number", placeholder: "75" },
            { name: "remarks", label: "Remarks", type: "text", placeholder: "Needs Improvement" },
        ]
    },
    {
        id: "bunk_pass",
        title: "Bunk Pass",
        description: "Official permission to skip class (not really).",
        icon: "wind",
        fields: [
            { name: "student_name", label: "Student Name", type: "text" },
            { name: "reason", label: "Reason", type: "text", placeholder: "Too sleepy" },
            { name: "date", label: "Date", type: "date" },
            { name: "approver", label: "Self-Approved By", type: "text", placeholder: "Me" },
        ]
    },
    {
        id: "hostel_complaint",
        title: "Hostel Complaint",
        description: "Lodge your grievances on-chain.",
        icon: "alert-triangle",
        fields: [
            { name: "student_name", label: "Student Name", type: "text" },
            { name: "room_no", label: "Room No", type: "text", placeholder: "A-101" },
            { name: "issue", label: "Issue", type: "text", placeholder: "Fan not working" },
            { name: "severity", label: "Severity", type: "select", options: ["Low", "Medium", "High", "Critical"] },
        ]
    }
];
