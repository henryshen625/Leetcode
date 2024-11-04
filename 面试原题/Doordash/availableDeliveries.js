class Delivery {
    constructor(pickUpTime, storedId) {
        this.pickUpTime = pickUpTime;
        this.storedId = storedId;
    
    }
}

class DDasher {
    constructor(dasherId, isHigherTier) {
        this.dasherId = dasherId;
        this.isHigherTier = isHigherTier;
    }
}

function getAvailableDeliveriesForDasher(dasher, allDeliveries, currentDateTime) {
    const eligibleDeliveries = [];
    allDeliveries.forEach(delivery => {
        const daysBetween = Math.abs(getDayOfYear(currentDateTime) - getDayOfYear(delivery.pickUpTime));
        if (daysBetween === 1) {
            if (dasher.isHigherTier && currentDateTime.getHours() >= 18) {
                eligibleDeliveries.push(delivery);
                return;
            }
            if (currentDateTime.getHours >= 19) {
                eligibleDeliveries.push(delivery);
                return;
            }
        }
    })
    return eligibleDeliveries;
}

function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

const deliveries = [
    new Delivery(new Date(2023, 9, 10, 10, 0), "StoreA"),
    new Delivery(new Date(2023, 9, 11, 10, 0), "StoreB"),
    new Delivery(new Date(2023, 9, 12, 10, 0), "StoreC")
];

const dasher = new DDasher("Dasher123", true);
const currentDateTime = new Date(2023, 9, 10, 18, 0);

const availableDeliveries = getAvailableDeliveriesForDasher(dasher, deliveries, currentDateTime);
console.log(availableDeliveries);