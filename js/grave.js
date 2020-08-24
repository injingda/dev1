// Retrieve and display user data
const rootRef = firebase.firestore().collection('users');
const storageRef = firebase.storage().ref('images');

window.onload = function () {
    var now = new Date().getTime();
    rootRef.where("dead", "<", now).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var name = doc.data().tName;
            var dead = doc.data().dead;
            var birth = doc.data().birth;
            var imgSrc = doc.data().image;
            var death = new Date(dead).toLocaleDateString();
            var birthDay = new Date(birth).toLocaleDateString();

            setTimeout(function () {
                if ($('.slick-slide').length < ((querySnapshot.docs).length) + 1) {
                    $('.grave-result').slick("slickAdd", '<div><div id="frame-container"><img class="grave-img" src="' + imgSrc + '" alt=""><img id="frame" src="./imgs/die_frame.png"></div><div class="grave-date"><div>名前：' + name + '</div><div>出生日:' + birthDay + '</div><div>死亡日:' + death + '</div></div></div>');
                };
            }, 0)
        });

        $('.grave-result').slick({
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