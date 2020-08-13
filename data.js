const userid = document.getElementById('userid');
const tName = document.getElementById('name');
const year = document.getElementById('year');
const month = document.getElementById('month');
const day = document.getElementById('day');
const hour = document.getElementById('hour');
const minute = document.getElementById('minute');
const second = document.getElementById('second');

const yearD = document.getElementById('year-d');
const monthD = document.getElementById('month-d');
const dayD = document.getElementById('day-d');
const hourD = document.getElementById('hour-d');
const minuteD = document.getElementById('minute-d');
const secondD = document.getElementById('second-d');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const removeBtn = document.getElementById('removeBtn');
const rootRef = firebase.database().ref('users');
const storageRef = firebase.storage().ref('images');

const resultBtn = document.getElementById('result-btn');



// Preview img

function previewFile() {
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
};
// End of preview img

// Upload user data

addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    var file = $("#img").prop("files")[0];
    var name = file["name"];
    var dateStr = new Date().getTime();
    var fileCompleteName = name + "_" + dateStr;
    var metadata = {
        contentType: 'image/jpeg'
    };
    var uploadTask = storageRef.child(fileCompleteName).put(file, metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING:
                    console.log('Upload is running');
                    break;
            }
        },
        function (error) {
            switch (error.code) {
                case 'storage/unauthorized':

                    break;

                case 'storage/canceled':

                    break;

                case 'storage/unknown':

                    break;
            }
        },
        function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                const autoid = rootRef.push().key
                rootRef.child(autoid).set({
                    name: tName.value,
                    year: year.value,
                    month: month.value,
                    day: day.value,
                    hour: hour.value,
                    minute: minute.value,
                    second: second.value,
                    yearD: yearD.value,
                    monthD: monthD.value,
                    dayD: dayD.value,
                    hourD: hourD.value,
                    minuteD: minuteD.value,
                    secondD: secondD.value,
                    image: downloadURL
                });
            });
            $("#main").hide();
            $("#success").show();
        });
});
// End of upload

// Retrieve and display user data
resultBtn.addEventListener('click', (e) => {
    e.preventDefault();
    rootRef.once("value").then(function (snapshot) {
        var results = Object.values(snapshot.val());
        for (result in results) {
            var year = results[result].year;
            var month = results[result].month;
            var day = results[result].day;
            var hour = results[result].hour;
            var minute = results[result].minute;
            var second = results[result].second;
            var yearD = results[result].yearD;
            var monthD = results[result].monthD;
            var dayD = results[result].dayD;
            var hourD = results[result].hourD;
            var minuteD = results[result].minuteD;
            var secondD = results[result].secondD;
            var imgSrc = results[result].image;
            var birth = new Date(year, month, day, hour, minute, second).getTime();
            var dead = new Date(yearD, monthD, dayD, hourD, minuteD, secondD).getTime();

            function age() {
                setInterval(function () {
                    var now = new Date().getTime();
                    var distance = dead - birth;
                    var section = now - birth;
                    var resultP = Math.floor((section / distance) * 100);
                }, 1000);
            };
            $('.result').slick("slickAdd", '<div><img src="' + imgSrc + '" alt=""></div><div>' + agel + '</>');
        };
    });

    function slick() {
        $('.result').slick({
            centerMode: true,
            centerPadding: '60px',
            slidesToShow: 3,
            responsive: [{
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
        })
    };
    slick();
});
// End of user data