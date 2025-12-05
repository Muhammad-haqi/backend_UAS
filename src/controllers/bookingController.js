

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


exports.createBookingOnOrder = async (newOrder) => {
    
   
    const bookingData = newOrder.kursi.map((kursi) => ({
        pesananId: newOrder.id, 
        asal: newOrder.asal,
        tujuan: newOrder.tujuan,
        tanggal: newOrder.tanggalBerangkat,
        nomorKursi: kursi,
        statusKursi: "Booked", 
    }));

    try {
       
        await prisma.booking.createMany({
            data: bookingData,
        });

        console.log(`Kursi berhasil diblokir untuk Pesanan ID: ${newOrder.id}`);
        return { success: true };
        
    } catch (error) {
       
        console.error("Gagal membuat Booking kursi:", error);
        
        
        throw new Error("Kursi sudah terambil atau terjadi kesalahan booking.");
    }
};


exports.deleteBookingOnOrderDelete = async (pesananId) => {
    try {
        await prisma.booking.deleteMany({
            where: { pesananId: pesananId }
        });
        console.log(`Booking kursi dilepaskan untuk Pesanan ID: ${pesananId}`);
        return { success: true };
    } catch (error) {
        console.error("Gagal menghapus Booking kursi:", error);
        throw new Error("Gagal melepaskan kursi.");
    }
};

