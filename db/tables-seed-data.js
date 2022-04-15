let numOfHikes = 60;
let numOfTags = 15;
let tagArr = [];
for (let k = 1; k <= numOfTags; k++) {
    tagArr.push(k);
}

let hikeTagSeed = [];

for (let hikeId = 1; hikeId <= numOfHikes; hikeId++) {
    let min = 4;
    let max = 6;
    let totalTags = Math.floor(Math.random() * (max - min + 1) + min);
    let tagArrCopy = tagArr.slice();
    for (let j = 1; j <= totalTags; j++) {
        let random = Math.floor(Math.random() * tagArrCopy.length);
        let randomTagId = tagArrCopy.splice(random, 1)[0];
        let obj = {};
        obj.hikeId = hikeId;
        obj.tagId = randomTagId;
        obj.createdAt = new Date();
        obj.updatedAt = new Date();

        hikeTagSeed.push(obj);
    }
}

// console.log(hikeTagSeed);

let reviews = [
    "Awesome trail. Great waterfall at the end. ",
    "Good trail that’s not heavily populated. Great view at the end but be prepared for a little incline at the end. ",
    "Awesome view but difficult trail towards the end.",
    "Great strenuous solo hike on a warm morning. 4 miles up and 4 down.",
    "Awesome trail and beautiful views to make it all worth it!",
    "Went today but the road was closed.  So bummed.",
    "Love!",
    "Difficult trail but so worth it!!! Definitely pack good amount of water. The water is COLD but feels great on your feet after hiking all the way up there. ",
    "Rugged trail, lot of uneven ground with rocks and tree roots. But waterfall is absolutely worth the hike. ",
    "Very pretty! The last mile to the falls is pretty difficult but worth it. Take water & a snack, and wear hiking boots!",
    "rough going up, rocky and roots but the falls were awesome!",
    "Pictures does not do this place justice what an amazing day it was.",
    "Great trail mostly uphill. Definitely pack a lunch.",
    "Trail very challenging. It was worth the payoff. ",
    "Great hike.  Not too many people out there. Definitely worth the effort!!",
    "Very hard but worth the hike",
    "Beautiful!!!!",
    "Awesome! Moderate hike but very rewarding after rains.",
    "Absolutely phenomenal Journey.",
    "Awesome trail. Very steep up at the top.",
    "spectacular with the snow. still a good amount on the last two miles. a bit slick. creek crossings were sketchy with ice covered rocks. highly recommend poles! couldn not have completed this hike today without them. ",
    "The first two miles are deceptively easy - wide roads and easy terrain. It was super muddy though. The third mile got snowy and more rocky terrain. Last mile was very snowy-icy and had a lot of fallen trees that made it super hard to pass and a difficult river crossing in the end. But it is absolutely worth it!",
    "Beautiful scenic trail!  Last mile is difficult so be prepared.  Snow was beautiful",
];

let numOfUsers = 2; //updated to 2

let reviewSeed = [];

for (let hikeId = 1; hikeId <= numOfHikes; hikeId++) {
    let min = 5;
    let max = 15;
    let totalReviews = Math.floor(Math.random() * (max - min + 1) + min);
    let reviewsCopy = reviews.slice();

    for (let j = 1; j <= totalReviews; j++) {
        let randomNum = Math.floor(Math.random() * reviewsCopy.length);
        let randomReview = reviewsCopy.splice(randomNum, 1);
        let min = 1;
        let max = 5;

        let randomRating = Math.floor(Math.random() * (max - min + 1) + min);

        let randomUserID = Math.floor(Math.random() * numOfUsers + 1);

        let obj = {};
        obj.userId = randomUserID;
        obj.hikeId = hikeId;
        obj.rating = randomRating;
        obj.comment = randomReview[0];
        obj.dateHike = new Date();
        obj.createdAt = new Date();
        obj.updatedAt = new Date();
        reviewSeed.push(obj);
    }
}

// console.log(reviewSeed);

module.exports = {
    hikeTagSeed,
    reviewSeed,
};
