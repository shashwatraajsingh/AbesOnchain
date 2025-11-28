module student_nfts::nfts {
    use std::string::{Self, String};
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::package;

    // --- Structs ---

    struct NFTS has drop {}

    struct StudentIdCard has key, store {
        id: UID,
        name: String,
        student_id: String,
        course: String,
        dob: String,
        validity: String,
    }

    struct EventPass has key, store {
        id: UID,
        event_name: String,
        date: String,
        venue: String,
        holder_name: String,
    }

    struct AttendanceReport has key, store {
        id: UID,
        student_name: String,
        subject: String,
        percentage: String,
        remarks: String,
    }

    struct BunkPass has key, store {
        id: UID,
        student_name: String,
        reason: String,
        date: String,
        approver: String,
    }

    struct HostelComplaint has key, store {
        id: UID,
        student_name: String,
        room_no: String,
        issue: String,
        severity: String,
    }

    // --- Init ---
    fun init(otw: NFTS, ctx: &mut TxContext) {
        let publisher = package::claim(otw, ctx);
        transfer::public_transfer(publisher, tx_context::sender(ctx));
    }

    // --- Mint Functions ---

    public entry fun mint_id_card(
        name: vector<u8>,
        student_id: vector<u8>,
        course: vector<u8>,
        dob: vector<u8>,
        validity: vector<u8>,
        ctx: &mut TxContext
    ) {
        let nft = StudentIdCard {
            id: object::new(ctx),
            name: string::utf8(name),
            student_id: string::utf8(student_id),
            course: string::utf8(course),
            dob: string::utf8(dob),
            validity: string::utf8(validity),
        };
        transfer::public_transfer(nft, tx_context::sender(ctx));
    }

    public entry fun mint_event_pass(
        event_name: vector<u8>,
        date: vector<u8>,
        venue: vector<u8>,
        holder_name: vector<u8>,
        ctx: &mut TxContext
    ) {
        let nft = EventPass {
            id: object::new(ctx),
            event_name: string::utf8(event_name),
            date: string::utf8(date),
            venue: string::utf8(venue),
            holder_name: string::utf8(holder_name),
        };
        transfer::public_transfer(nft, tx_context::sender(ctx));
    }

    public entry fun mint_attendance_report(
        student_name: vector<u8>,
        subject: vector<u8>,
        percentage: vector<u8>,
        remarks: vector<u8>,
        ctx: &mut TxContext
    ) {
        let nft = AttendanceReport {
            id: object::new(ctx),
            student_name: string::utf8(student_name),
            subject: string::utf8(subject),
            percentage: string::utf8(percentage),
            remarks: string::utf8(remarks),
        };
        transfer::public_transfer(nft, tx_context::sender(ctx));
    }

    public entry fun mint_bunk_pass(
        student_name: vector<u8>,
        reason: vector<u8>,
        date: vector<u8>,
        approver: vector<u8>,
        ctx: &mut TxContext
    ) {
        let nft = BunkPass {
            id: object::new(ctx),
            student_name: string::utf8(student_name),
            reason: string::utf8(reason),
            date: string::utf8(date),
            approver: string::utf8(approver),
        };
        transfer::public_transfer(nft, tx_context::sender(ctx));
    }

    public entry fun mint_hostel_complaint(
        student_name: vector<u8>,
        room_no: vector<u8>,
        issue: vector<u8>,
        severity: vector<u8>,
        ctx: &mut TxContext
    ) {
        let nft = HostelComplaint {
            id: object::new(ctx),
            student_name: string::utf8(student_name),
            room_no: string::utf8(room_no),
            issue: string::utf8(issue),
            severity: string::utf8(severity),
        };
        transfer::public_transfer(nft, tx_context::sender(ctx));
    }
}
