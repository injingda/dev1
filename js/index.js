// Retrieve and display user data
const rootRef = firebase.firestore().collection('users');
const storageRef = firebase.storage().ref('images');

window.onload = function () {
    var now = new Date().getTime();
    rootRef.where("dead", ">", now).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var dead = doc.data().dead;
            var birth = doc.data().birth;
            var imgSrc = doc.data().image;
            var secNow = new Date().getTime();
            var distance = dead - birth;
            var section = secNow - birth;
            var resultP = Math.floor((section / distance) * 100);
            var death = new Date(dead).toLocaleDateString();
            var birthDay = new Date(birth).toLocaleDateString();
            setTimeout(function () {
                if ($('.slick-slide').length < ((querySnapshot.docs).length) + 1) {
                    $('.result').slick("slickAdd", '<div><div class="old">' + resultP + '才</div><img id="image"src="' + imgSrc + '" alt=""><div class="index-date"><div >買った日:' + birthDay + '</div><div>賞味期間:' + death + '</div></div></div>');
                };
            }, 0)
        });

        $('.result').slick({
            centerMode: true,
            centerPadding: '60px',
            slidesToShow: 3,
            prevArrow: '<button type="button" class="slick-prev">⬅︎もっと若い</button>',
            nextArrow: '<button type="button" class="slick-next">もっとお年寄り➡︎</button>',
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 5
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                }
            ]
        });
    });
};
// End of user data