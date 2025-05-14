import Voucher from '../models/Voucher.js';

const vouchers = [
    {
        id: 1,
        code: "CHAOHE20",
        description: "Chào hè rực rỡ: Giảm 20% giá vé",
        type: "percent",
        value: 20.0,
        startAt: "2025-06-01T00:00:00Z",
        quantity: 500,
        endAt: "2025-06-30T23:59:59Z",
        AdminId: 11,
        status: 'active'
    },
    {
        id: 2,
        code: "GIAM30K",
        description: "Khuyến mãi đặc biệt: Giảm 30.000 VNĐ",
        type: "fixed",
        value: 30000.0,
        startAt: "2025-05-15T00:00:00Z",
        quantity: 1000,
        endAt: "2025-05-31T23:59:59Z",
        AdminId: 11,
        status: 'active'
    },
    {
        id: 4,
        code: "BANMOI15",
        description: "Ưu đãi giảm 15%",
        type: "percent",
        value: 15.0,
        startAt: "2025-01-01T00:00:00Z",
        quantity: 5000,
        endAt: "2025-12-31T23:59:59Z",
        AdminId: 11,
        status: 'active'
    },
    {
        id: 5,
        code: "TECHVIP",
        description: "Giảm 50K",
        type: "fixed",
        value: 100000.0,
        startAt: "2025-06-01T00:00:00Z",
        quantity: 150,
        endAt: "2025-07-15T23:59:59Z",
        AdminId: 12,
        status: 'active'
    },
    {
        id: 6,
        code: "CUOITUAN10",
        description: "Giảm 10% vé",
        type: "percent",
        value: 10.0,
        startAt: "2025-05-01T00:00:00Z",
        quantity: 2000,
        endAt: "2025-09-30T23:59:59Z",
        AdminId: 11,
        status: 'active'
    },
    {
        id: 7,
        code: "GIAMNGAY20K",
        description: "Flash Sale: Giảm ngay 20.000 VNĐ",
        type: "fixed",
        value: 20000.0,
        startAt: "2025-05-05T00:00:00Z",
        quantity: 300,
        endAt: "2025-05-10T23:59:59Z",
        AdminId: 12,
        status: 'active'
    },
    {
        id: 8,
        code: "SINHNHAT5",
        description: "Giảm 5%",
        type: "percent",
        value: 5.0,
        startAt: "2025-01-01T00:00:00Z",
        quantity: 10000,
        endAt: "2025-12-31T23:59:59Z",
        AdminId: 11,
        status: 'active'
    },
    {
        id: 9,
        code: "TETKM",
        description: "Mừng Tết Nguyên Đán: Giảm 88.000 VNĐ",
        type: "fixed",
        value: 88000.0,
        startAt: "2026-01-15T00:00:00Z",
        quantity: 888,
        endAt: "2026-02-15T23:59:59Z",
        AdminId: 12,
        status: 'active'
    },
    {
        id: 10,
        code: "TRIAN10",
        description: "Tri ân khách hàng thân thiết: Giảm 10%",
        type: "percent",
        value: 10.0,
        startAt: "2025-07-01T00:00:00Z",
        quantity: 1000,
        endAt: "2025-07-31T23:59:59Z",
        AdminId: 11,
        status: 'active'
    }
];

const findAllVoucher = (usable) => {
    if (!usable) {
        const result = vouchers
            .filter(vc => vc.status !== 'deleted')
            .map((vc) => {
                const v = new Voucher(vc.code, vc.description, vc.type, vc.value, vc.quantity, vc.startAt, vc.endAt, vc.status);
                v.id = vc.id;
                return v;
            })
        return result;
    } else {
        const now = new Date()
        const result = vouchers
            .filter(vc => {
                const startTime = new Date(vc.startAt);
                const endTime = new Date(vc.endAt);
                return vc.quantity > 0 && vc.status !== 'deleted' && now >= startTime && now <= endTime
            })
            .map((vc) => {
                const v = new Voucher(vc.code, vc.description, vc.type, vc.value, vc.quantity, vc.startAt, vc.endAt, vc.status);
                v.id = vc.id;
                return v;
            })
        return result;
    }
}

const deleteVoucher = (voucher) => {
    for (let i = 0; i < vouchers.length; ++i) {
        if (vouchers[i].id === voucher.id) {
            vouchers[i].status = 'deleted';
            console.log(vouchers);
            return true;
        }
    }
    return false;
}

const addVoucher = (voucher) => {
    if (vouchers.filter((v) => v.code === voucher.code).length > 0) return false;
    voucher.id = (vouchers.length > 0) ? vouchers[vouchers.length - 1].id + 1 : 1;
    vouchers.push(voucher);
    // console.log(voucher);
    return true;
}

const getVoucherById = (id) => {
    for (let vc of vouchers) {
        if (vc.id === id) {
            const voucher = new Voucher(vc.code, vc.description, vc.type, vc.value, vc.quantity, vc.startAt, vc.endAt, vc.status);
            voucher.id = vc.id;
            return voucher;
        }
    }
    // console.log("abc");
    return null;
}

const takeVoucher = ({ id }) => {
    const found = vouchers.find(item => item.id === id);

    if (!found || found.quantity < 1) return false;
    const now = new Date();
    const startDate = new Date(found.startAt);
    const endDate = new Date(found.endAt);

    if (now < startDate || now > endDate) return false;
    found.quantity -= 1;
    return true;
}

export { findAllVoucher, deleteVoucher, addVoucher, getVoucherById, takeVoucher };
