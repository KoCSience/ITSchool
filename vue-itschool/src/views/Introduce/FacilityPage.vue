<template>
  <aritcle>
    <header>
      <h2>Facility Introduction</h2>
    </header>
    <body>
      <section>
        <div class="facility" id="library">
          <h3>Library</h3>
          <!-- <button class="bb" @click="toggleText()">Busines Hours</button>
                    <h4 v-if="showText">9:00 a.m ~ 10:00 p.m.</h4><br> -->
          <p>
            In addition to collecting, preserving, and providing printed
            materials, the libraries on campus serve as the University's
            academic information infrastructure by accommodating a variety of
            electronic media, improving information retrieval service functions,
            and disseminating information on research results.
          </p>
          <br />
          <p class="business-hours">business hours : 09:00 a.m. ~ 10:00 p.m.</p>
        </div>
        <div class="button-container">
          <button class="bb" @click="scrollTo('library')">Library</button>
          <button class="bb" @click="scrollTo('computer-lab')">
            Computer Lab
          </button>
          <button class="bb" @click="scrollTo('gym')">Gym</button>
          <button class="bb" @click="scrollTo('dining-room')">
            Dining Room
          </button>
          <button class="bb" @click="scrollTo('art-studio')">Art Studio</button>
          <button class="bb" @click="scrollTo('multipurpose-hall')">
            Multipurpose Hall
          </button>
          <button class="bb" @click="scrollTo('cafeteria')">Cafeteria</button>
          <button class="bb" @click="scrollTo('career-center')">
            Career Center
          </button>
        </div>
        <div class="facility" id="computer-lab">
          <h3>Computer Lab</h3>
          <p>
            A computer lab has been set up for learning about IT. Specialized
            software and peripheral equipment have been installed.
          </p>
          <br />
          <p class="business-hours">business hours : 08:00 a.m. ~ 10:00 p.m.</p>
          <!-- <button class="bb" @click="toggleText()">Busines Hours</button> -->
        </div>
        <div class="facility" id="gym">
          <h3>Gym</h3>
          <p>
            It is used for regular physical education classes and
            extracurricular activities, as well as for the school's ceremonies
            and various events.
          </p>
          <br />
          <p class="business-hours">business hours : 09:00 a.m. ~ 08:00 p.m.</p>
        </div>
        <div class="facility" id="dining-room">
          <h3>Dining Room</h3>
          <p>
            There is a cafeteria for students and staff to eat. You can enjoy
            not only local cuisine, but also Japanese and French cuisine.
          </p>
          <br />
          <p class="business-hours">business hours : 07:30 a.m. ~ 07:00 p.m.</p>
        </div>
        <div class="facility" id="art-studio">
          <h3>Art Studio</h3>
          <p>
            There are studios for conducting artistic activities such as fine
            arts and music.
          </p>
          <br />
          <p class="business-hours">business hours : 10:00 a.m. ~ 06:00 p.m.</p>
        </div>
        <div class="facility" id="multipurpose-hall">
          <h3>Multipurpose Hall</h3>
          <p>
            There is a multipurpose hall where lectures, events, and gatherings
            can be held. It can be used freely when there are no lectures.
          </p>
          <br />
          <p class="business-hours">business hours : 09:00 a.m. ~ 10:00 p.m.</p>
        </div>
        <div class="facility" id="cafeteria">
          <h3>Cafeteria</h3>
          <p>
            There is a cafe for students and faculty to refresh and interact.
            You can drink various types of beverages.
          </p>
          <br />
          <p class="business-hours">business hours : 10:00 a.m. ~ 05:00 p.m.</p>
        </div>
        <div class="facility" id="career-center">
          <h3>Career Center</h3>
          <p>
            A career center has been established to receive job hunting and
            career support.
          </p>
          <br />
          <p class="business-hours">business hours : 09:00 a.m. ~ 06:00 p.m.</p>
        </div>
      </section>
    </body>
  </aritcle>
</template>

<style scoped>
.button-container {
  display: flex;
  flex-direction: column;
  width: 20%;
  float: right;
}

.bb {
  background-color: #222;
  border-radius: 4px;
  border-style: none;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: "Farfetch Basis", "Helvetica Neue", Arial, sans-serif;
  font-weight: 700;
  line-height: 1.5;
  margin: 5px 0; /* ボタン間の余白を追加 */
  min-height: 30px;
  min-width: 10px;
  outline: none;
  overflow: hidden;
  padding: 9px 20px 8px;
  text-align: center;
  text-transform: none;
  transition: background-color 0.3s ease;
}

.bb:hover {
  background-color: #444; /* ホバー時の背景色 */
}
/* .bb {
  background-color: #222;
  border-radius: 4px;
  border-style: none;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: "Farfetch Basis","Helvetica Neue",Arial,sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  margin: 0;
  max-width: none;
  min-height: 20px;
  min-width: 6px;
  outline: none;
  overflow: hidden;
  padding: 9px 20px 8px;
  position: relative;
  text-align: center;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  /* width: 100%; 
} */

/* .bb:hover,
.bb:focus {
  opacity: .75;
} */

p {
  text-align: left;
}

button {
  float: left;
}
h4 {
  text-align: left;
}
.facility {
  width: 80%;
  float: left;
}
</style>

<script scoped>
// export default {
//     data() {
//         return {
//             showText: false
//         };
//     },
//     methods: {
//         toggleText() {
//             this.showText = !this.showText;
//         }
//     }
// };
export default {
  methods: {
    // ページ内リンクを処理するメソッド
    scrollTo(target) {
      // ターゲット要素を取得し、スクロール位置を取得
      const element = document.getElementById(target);
      const position = element.getBoundingClientRect().top + window.scrollY;

      // スクロール
      window.scrollTo({
        top: position,
        behavior: "smooth", // スムーズスクロールを有効化
      });
    },
  },
};
</script>
