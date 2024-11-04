import heapq
import math
import random

# https://leetcode.com/discuss/interview-question/1293040/Doordash-or-Phone-Screen-or-Software-Engineer-E4-or-Closest-Drivers-to-Restaurant

class Location:
    def __init__(self, longitude, lattitude):
        self.longitude = longitude;
        self.lattitude = lattitude;

class Dasher:
    def __init__(self, id, last_location, rating):
        self.id = id;
        self.last_location = last_location;
        self.rating = rating;

class ClosestDriver:
    def __init__(self, dashers, k, restaurant_location):
        self.dashers = dashers
        self.k = k
        self.restaurant_location = restaurant_location;

    def distance(self, location):
        return math.sqrt((location.longitude - self.restaurant_location.longitude) ** 2 + (location.lattitude - self.restaurant_location.lattitude) ** 2)
    

    def getClosestDasher(self):
        heap = [];
        result = []
        for dasher in self.dashers:
            dist = self.distance(dasher.last_location);
            heapq.heappush(heap, (dist, dasher.rating, dasher));
        i = 0;
        while i < self.k:
            distance, rating, dasher = heapq.heappop(heap);
            result.append(dasher.id);
            i += 1;
        return result;

    # def getClosestDriver(self):
    #     closest_dashers = []
    #     for dasher in self.dashers:
    #         dist = self.distance(dasher.last_location)
    #         heapq.heappush(closest_dashers, (-dist, dasher.rating, dasher))
    #         if len(closest_dashers)>self.k:
    #             heapq.heappop(closest_dashers)
    #     return [dasher[2].id for dasher in closest_dashers]

def generateDashers(num):
    dashers = []
    for i in range(num):
        rating = random.randrange(1, 5)
        latt = random.randrange(100, 200)
        long = random.randrange(100, 200)
        dashers.append(Dasher(i, Location(long, latt), rating))
    return dashers

dashers = generateDashers(5)
restaurant_long = random.randrange(100, 200)
restaurant_latt = random.randrange(100, 200)
obj = ClosestDriver(dashers, 3, Location(restaurant_long, restaurant_latt))
print(obj.getClosestDasher())
print(obj.getClosestDriver())