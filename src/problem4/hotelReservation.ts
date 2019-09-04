export class HotelReservation {
  reserveHotel = (a, b, k) => {
    const len = a.length;
    let rentedRoom = 0;
    const indexing = [];
    for (let i = 0; i < len; ++i) {
      for (let j = a[i]; j <= b[i]; ++j) {
        if (!indexing[j]) indexing[j] = 0;
        indexing[j]++;
        rentedRoom = Math.max(rentedRoom, indexing[j]);
      }
    }
    return k >= rentedRoom;
  };
}
