/**
 * Created by bhavyaagg on 8/10/17.
 */

$(document).ready(function () {

  $.get('http://localhost:8080/api/blockchain', function (blocks) {
    if (blocks.success === true) {

      console.log(blocks.data);
      let blockList = $('#minicourses-list');
      for (let i = 1; i < blocks.data.length; i++) {
        console.log(blocks.data[i].data);
        blocks.data[i].data = JSON.parse(blocks.data[i].data);
        console.log(blocks);
        blockList.append(`<li class="minicourses-list-li col-12" style="height: auto">
                <div class="minicourses-list-li-div">
                    <div class="text-center"  style="padding: 15px 0">
                    <h3>Block No.` + blocks.data[i].index + `</h3>
                    <p>Time: ` + blocks.data[i].timestamp + `<br>Username: ` + blocks.data[i].data.username + `<br>Amount: ` + blocks.data[i].data.amount + `<br>Current Hash: ` + blocks.data[i].hash + `<br>Previous Hash: ` + blocks.data[i].previousHash + `</p>
                    </div>
                </div>
            </li>`)
      }

    }
  })
});
