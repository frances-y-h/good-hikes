"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Hikes",
            [
                {
                    cityParkId: 7,
                    stateId: 47,
                    name: "Emory Peak Trail",
                    length: 10.4,
                    elevationChange: 2522,
                    difficultyId: 3,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/11109371/pexels-photo-11109371.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 7,
                    stateId: 47,
                    name: "Basin Loop Trail",
                    length: 2.4,
                    elevationChange: 465,
                    difficultyId: 1,
                    routeTypeId: 1,
                    imgUrl: "https://images.pexels.com/photos/11109369/pexels-photo-11109369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 3,
                    stateId: 47,
                    name: "Big Walnut Creek Loop",
                    length: 1.8,
                    elevationChange: 95,
                    difficultyId: 1,
                    routeTypeId: 1,
                    imgUrl: "https://images.pexels.com/photos/4054940/pexels-photo-4054940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 5,
                    stateId: 34,
                    name: "Frijolito Trail",
                    length: 2.6,
                    elevationChange: 528,
                    difficultyId: 2,
                    routeTypeId: 1,
                    imgUrl: "https://images.pexels.com/photos/8909585/pexels-photo-8909585.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 46,
                    stateId: 34,
                    name: "Grasshopper and Pinon Trail to Glorieta Baldy",
                    length: 15.8,
                    elevationChange: 3231,
                    difficultyId: 3,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/9877594/pexels-photo-9877594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 36,
                    stateId: 34,
                    name: "Devisadero Peak",
                    length: 5.6,
                    elevationChange: 1335,
                    difficultyId: 2,
                    routeTypeId: 1,
                    imgUrl: "https://images.pexels.com/photos/7853083/pexels-photo-7853083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 18,
                    stateId: 35,
                    name: "Gribley and Smith Pond Loop",
                    length: 4.1,
                    elevationChange: 971,
                    difficultyId: 2,
                    routeTypeId: 1,
                    imgUrl: "https://images.pexels.com/photos/434442/pexels-photo-434442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 9,
                    stateId: 35,
                    name: "Catskill Scenic Trail",
                    length: 24.9,
                    elevationChange: 780,
                    difficultyId: 1,
                    routeTypeId: 3,
                    imgUrl: "https://images.pexels.com/photos/21008/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 31,
                    stateId: 35,
                    name: "Dry Brook Ridge Trail",
                    length: 12.5,
                    elevationChange: 3546,
                    difficultyId: 2,
                    routeTypeId: 3,
                    imgUrl: "https://images.pexels.com/photos/172510/pexels-photo-172510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 52,
                    stateId: 35,
                    name: "Mongaup-Hardenburgh Trail",
                    length: 5.3,
                    elevationChange: 967,
                    difficultyId: 2,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/580151/pexels-photo-580151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 21,
                    stateId: 4,
                    name: "Mount Kessler Loop",
                    length: 8.2,
                    elevationChange: 839,
                    difficultyId: 2,
                    routeTypeId: 1,
                    imgUrl: "https://images.pexels.com/photos/327178/pexels-photo-327178.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 43,
                    stateId: 35,
                    name: "Mud Lake",
                    length: 5.9,
                    elevationChange: 767,
                    difficultyId: 2,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/1578750/pexels-photo-1578750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 44,
                    stateId: 7,
                    name: "Emerald Lake Trail",
                    length: 3.2,
                    elevationChange: 698,
                    difficultyId: 2,
                    routeTypeId: 2,
                    imgUrl: "https://images.unsplash.com/photo-1561592582-ec6b75c0b89f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 45,
                    stateId: 7,
                    name: "Columbine Lake Trail",
                    length: 8.3,
                    elevationChange: 2933,
                    difficultyId: 3,
                    routeTypeId: 2,
                    imgUrl: "https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2578&q=80",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 22,
                    stateId: 7,
                    name: "Palmer, Cabin Canyon, Strausenbach, and Central Gardens Trail Loop",
                    length: 4,
                    elevationChange: 593,
                    difficultyId: 1,
                    routeTypeId: 1,
                    imgUrl: "https://images.unsplash.com/photo-1628621479734-1cdb5627d27b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 49,
                    stateId: 40,
                    name: "Trail of Ten Falls",
                    length: 7.4,
                    elevationChange: 1151,
                    difficultyId: 2,
                    routeTypeId: 1,
                    imgUrl: "https://images.unsplash.com/photo-1606522244207-066c71923591?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 6,
                    stateId: 40,
                    name: "Beacon Rock Doetsch Walking Path",
                    length: 1.2,
                    elevationChange: 22,
                    difficultyId: 1,
                    routeTypeId: 1,
                    imgUrl: "https://images.unsplash.com/photo-1605973030374-949fb3feff7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 15,
                    stateId: 40,
                    name: "Crater Lake Rim Scenic Drive",
                    length: 50.2,
                    elevationChange: 5885,
                    difficultyId: 1,
                    routeTypeId: 1,
                    imgUrl: "https://images.unsplash.com/photo-1645600805600-2ea7e0af0f6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1619&q=80",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 1,
                    stateId: 52,
                    name: "Snow Lake Trail",
                    length: 6.7,
                    elevationChange: 1699,
                    difficultyId: 2,
                    routeTypeId: 2,
                    imgUrl: "https://images.unsplash.com/photo-1641679644331-0b52e184c0f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1380&q=80",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 35,
                    stateId: 52,
                    name: "Hoh Rain Forest Hall of Moss",
                    length: 1.1,
                    elevationChange: 78,
                    difficultyId: 1,
                    routeTypeId: 1,
                    imgUrl: "https://images.unsplash.com/photo-1648334675359-58690edad0c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 35,
                    stateId: 52,
                    name: "Sol Duc Falls Nature Trail",
                    length: 1.6,
                    elevationChange: 226,
                    difficultyId: 1,
                    routeTypeId: 2,
                    imgUrl: "https://images.unsplash.com/photo-1602562233070-84b50741f794?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2736&q=80",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 32,
                    stateId: 36,
                    name: "Cove, Cedar Ridge, Creekside and Chestnut Trail",
                    length: 4,
                    elevationChange: 406,
                    difficultyId: 2,
                    routeTypeId: 1,
                    imgUrl: "https://images.unsplash.com/photo-1633887998584-721fe3eae41a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1649&q=80",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 29,
                    stateId: 36,
                    name: "Catawba Trail",
                    length: 3,
                    elevationChange: 134,
                    difficultyId: 1,
                    routeTypeId: 2,
                    imgUrl: "https://images.unsplash.com/photo-1643491501412-865cf05c6863?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 4,
                    stateId: 45,
                    name: "Notch Trail",
                    length: 1.5,
                    elevationChange: 127,
                    difficultyId: 2,
                    routeTypeId: 2,
                    imgUrl: "https://images.unsplash.com/photo-1648781051847-ae6ca9ca07ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1227&q=80",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 54,
                    stateId: 48,
                    name: "Angels Landing Trail",
                    length: 4.4,
                    elevationChange: 1604,
                    difficultyId: 3,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/1469880/pexels-photo-1469880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 2,
                    stateId: 48,
                    name: "Delicate Arch Trail",
                    length: 3.2,
                    elevationChange: 629,
                    difficultyId: 2,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/2589455/pexels-photo-2589455.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 10,
                    stateId: 48,
                    name: "Navajo Loop and Queen's Garden Trail",
                    length: 2.9,
                    elevationChange: 646,
                    difficultyId: 2,
                    routeTypeId: 1,
                    imgUrl: "https://images.pexels.com/photos/416728/pexels-photo-416728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 50,
                    stateId: 48,
                    name: "Lake Blanche Trail",
                    length: 6.8,
                    elevationChange: 2808,
                    difficultyId: 3,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/235734/pexels-photo-235734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 51,
                    stateId: 48,
                    name: "Donut Falls Trail",
                    length: 3.3,
                    elevationChange: 538,
                    difficultyId: 1,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/2589456/pexels-photo-2589456.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 34,
                    stateId: 48,
                    name: "Stewart Cascade Trail #056",
                    length: 3.4,
                    elevationChange: 646,
                    difficultyId: 2,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/414061/pexels-photo-414061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 14,
                    stateId: 4,
                    name: "Devils Bridge Trail",
                    length: 3.9,
                    elevationChange: 521,
                    difficultyId: 2,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/414136/pexels-photo-414136.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 20,
                    stateId: 4,
                    name: "Camelback Mountain via Echo Canyon Trail",
                    length: 2.5,
                    elevationChange: 1420,
                    difficultyId: 3,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/383619/pexels-photo-383619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 38,
                    stateId: 4,
                    name: "Piestewa Peak Summit Trail #300",
                    length: 2.1,
                    elevationChange: 1148,
                    difficultyId: 3,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/2405435/pexels-photo-2405435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 41,
                    stateId: 3,
                    name: "Boynton Canyon Trail",
                    length: 7.3,
                    elevationChange: 1167,
                    difficultyId: 2,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/4061938/pexels-photo-4061938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 30,
                    stateId: 4,
                    name: "Flatiron via Siphon Draw Trail",
                    length: 5.5,
                    elevationChange: 2641,
                    difficultyId: 3,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/11320528/pexels-photo-11320528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 33,
                    stateId: 4,
                    name: "Tom's Thumb Trail",
                    length: 4,
                    elevationChange: 1236,
                    difficultyId: 3,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/9487030/pexels-photo-9487030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 53,
                    stateId: 5,
                    name: "Vernal and Nevada Falls via Mist Trail",
                    length: 6,
                    elevationChange: 2162,
                    difficultyId: 3,
                    routeTypeId: 1,
                    imgUrl: "https://images.pexels.com/photos/4992845/pexels-photo-4992845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 53,
                    stateId: 5,
                    name: "Clouds Rest Trail",
                    length: 14,
                    elevationChange: 3166,
                    difficultyId: 3,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/5164440/pexels-photo-5164440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 53,
                    stateId: 5,
                    name: "Cathedral Lakes Trail",
                    length: 8.5,
                    elevationChange: 1607,
                    difficultyId: 2,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 27,
                    stateId: 5,
                    name: "Bullfrog Lake",
                    length: 13.1,
                    elevationChange: 3658,
                    difficultyId: 3,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg?auto=compress&cs=tinysrgb&h=650&w=940",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 27,
                    stateId: 5,
                    name: "Rae Lakes Trail",
                    length: 39.1,
                    elevationChange: 7670,
                    difficultyId: 3,
                    routeTypeId: 1,
                    imgUrl: "https://images.pexels.com/photos/2850287/pexels-photo-2850287.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 17,
                    stateId: 5,
                    name: "Badwater Basin Salt Flats Trail",
                    length: 1.9,
                    elevationChange: 6,
                    difficultyId: 1,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/2994126/pexels-photo-2994126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 25,
                    stateId: 5,
                    name: "Cholla Cactus Garden Trail",
                    length: 0.2,
                    elevationChange: 9,
                    difficultyId: 1,
                    routeTypeId: 1,
                    imgUrl: "https://images.pexels.com/photos/8979752/pexels-photo-8979752.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 47,
                    stateId: 5,
                    name: "Emerald Lake",
                    length: 10.3,
                    elevationChange: 2568,
                    difficultyId: 2,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/9353990/pexels-photo-9353990.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 42,
                    stateId: 5,
                    name: "Lady Bird Johnson Grove Trail",
                    length: 1.5,
                    elevationChange: 101,
                    difficultyId: 1,
                    routeTypeId: 1,
                    imgUrl: "https://images.pexels.com/photos/2645414/pexels-photo-2645414.jpeg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 39,
                    stateId: 5,
                    name: "Condor Gulch Trail to High Peaks Trail Loop",
                    length: 5.5,
                    elevationChange: 1630,
                    difficultyId: 2,
                    routeTypeId: 1,
                    imgUrl: "https://images.pexels.com/photos/2542329/pexels-photo-2542329.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 28,
                    stateId: 5,
                    name: "Lassen Peak",
                    length: 5.1,
                    elevationChange: 1968,
                    difficultyId: 3,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/3956288/pexels-photo-3956288.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 11,
                    stateId: 5,
                    name: "Potato Harbor Trail",
                    length: 4.9,
                    elevationChange: 603,
                    difficultyId: 1,
                    routeTypeId: 1,
                    imgUrl: "https://images.pexels.com/photos/315998/pexels-photo-315998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 23,
                    stateId: 29,
                    name: "Avalanche Lake via the Trail of the Cedars",
                    length: 5.9,
                    elevationChange: 757,
                    difficultyId: 2,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 23,
                    stateId: 29,
                    name: "Grinnell Glacier Trail",
                    length: 11.2,
                    elevationChange: 2181,
                    difficultyId: 3,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/3996433/pexels-photo-3996433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 16,
                    stateId: 29,
                    name: "Lava Lake (Cascade Creek) Trail",
                    length: 6,
                    elevationChange: 1620,
                    difficultyId: 2,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 8,
                    stateId: 29,
                    name: "Beehive Basin Trail No. 40",
                    length: 7.1,
                    elevationChange: 1650,
                    difficultyId: 2,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 13,
                    stateId: 2,
                    name: "Flattop Mountain Trail",
                    length: 3.3,
                    elevationChange: 1430,
                    difficultyId: 3,
                    routeTypeId: 1,
                    imgUrl: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 26,
                    stateId: 2,
                    name: "Harding Ice Field Trail",
                    length: 9.3,
                    elevationChange: 3641,
                    difficultyId: 3,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/270756/pexels-photo-270756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 12,
                    stateId: 2,
                    name: "Portage Pass Trail",
                    length: 4.2,
                    elevationChange: 1433,
                    difficultyId: 2,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/300857/pexels-photo-300857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 19,
                    stateId: 2,
                    name: "Mount Healy Overlook Trail",
                    length: 6.9,
                    elevationChange: 2483,
                    difficultyId: 2,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 24,
                    stateId: 46,
                    name: "Alum Cave Trail to mount LeConte",
                    length: 11,
                    elevationChange: 3061,
                    difficultyId: 3,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/462042/pexels-photo-462042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 40,
                    stateId: 46,
                    name: "Grassy Ridge Bald via Appalachian Trail",
                    length: 5,
                    elevationChange: 1.79,
                    difficultyId: 2,
                    routeTypeId: 2,
                    imgUrl: "https://images.pexels.com/photos/2539363/pexels-photo-2539363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 37,
                    stateId: 46,
                    name: "Mossy Ridge Trail",
                    length: 5.3,
                    elevationChange: 948,
                    difficultyId: 2,
                    routeTypeId: 1,
                    imgUrl: "https://images.pexels.com/photos/4297440/pexels-photo-4297440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    cityParkId: 48,
                    stateId: 46,
                    name: "Machine Falls, Adams Falls, Busby Falls and Laurel Bluff Loop",
                    length: 5,
                    elevationChange: 662,
                    difficultyId: 2,
                    routeTypeId: 1,
                    imgUrl: "https://images.pexels.com/photos/225203/pexels-photo-225203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Hikes", null, {});
    },
};
