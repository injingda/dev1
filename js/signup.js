const userid = document.getElementById('userid');
const tName = document.getElementById('name');
const email = document.getElementById('eamil');
const inputYear = document.getElementById('year');
const inputMonth = document.getElementById('month');
const inputDay = document.getElementById('day');
const inputHour = document.getElementById('hour');
const inputMinute = document.getElementById('minute')
const inputSecond = document.getElementById('second');
// 
const inputYearD = document.getElementById('year-d');
const inputMonthD = document.getElementById('month-d');
const inputDayD = document.getElementById('day-d');
const inputHourD = document.getElementById('hour-d');
const inputMinuteD = document.getElementById('minute-d');
const inputSecondD = document.getElementById('second-d');
const addBtn = document.getElementById('addBtn');
const rootRef = firebase.firestore().collection('users');
const storageRef = firebase.storage().ref('images');

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
            var birth = new Date(inputYear.value, ((inputMonth.value) - 1), inputDay.value, inputHour.value, inputMinute.value, inputSecond.value).getTime();
            var dead = new Date(inputYearD.value, ((inputMonthD.value) - 1), inputDayD.value, inputHourD.value, inputMinuteD.value, inputSecondD.value).getTime();

            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                rootRef.doc().set({
                    tName: tName.value,
                    birth: birth,
                    dead: dead,
                    image: downloadURL,
                    // email: email.value
                });
            });
            $("#main").hide();
            $(".title").hide();
            $("#success").show();
        });
});