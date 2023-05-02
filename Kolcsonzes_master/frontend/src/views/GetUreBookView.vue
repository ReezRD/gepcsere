<script>
import * as bootstrap from "bootstrap";
import { useUrlStore } from "@/stores/url";
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";
const storeUrl = useUrlStore();
const storeLogin = useLoginStore();

class Data {
  constructor(
    id = 0,
    writer = null,
    title = null,
    year = null,
  ) {
    this.id = id;
    this.writer = writer;
    this.title = title;
    this.year = year;
  }
}

class SpecimenData {
  constructor(
    sId = 0,
    opusid = 0,
    price = null,
    acquisition = null,
  ) {
    this.sId = sId;
    this.opusid = opusid;
    this.price = price;
    this.acquisition = acquisition;
  }
}

class LoanignData {
  constructor(
    id = 0,
    writer = null,
    title = null,
    year = null,
    sId = 0,
    opusid = 0,
    price = null,
    acquisition = null,
    name = null,
    specimentid = 0,
    studentid = 0,
    away = null,
    back = null
  ) {
    this.id = id;
    this.writer = writer;
    this.title = title;
    this.year = year;
    this.sId = sId;
    this.opusid = opusid;
    this.price = price;
    this.acquisition = acquisition;
    this.name = name;
    this.specimentid = specimentid;
    this.studentid = studentid;
    this.away = away;
    this.back = back;
  }
}

export default {
  data() {
    return {
      storeUrl,
      storeLogin,
      Data: [],
      SpecimenData: [],
      LoanignData: [],
      currentDataId: null,
      edittableData: new Data(),
      edittableSpecimen: new SpecimenData(),
      edittableLoaning: new LoanignData(),
      form: null,
      // state: "view",
      currentId: null,
      query: null,
    };
  },
  mounted() {
    this.getOpus();
    // this.getSpecimen();
    this.getSpecimenById();
    this.getEverythingBySpecimenId();
    // this.getEverything();
  },
  methods: {
    async getOpus() {
      let url = this.storeUrl.urlOpus;
      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
      };
      const response = await fetch(url, config);
      const data = await response.json();
      this.Data = data.data;
    },
    async getSpecimen() {
      let url = this.storeUrl.urlSpecimen;
      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
      };
      const response = await fetch(url, config);
      const data = await response.json();
      this.SpecimenData = data.data;
    },
    async getSpecimenById(id) {
      let url = `${this.storeUrl.urlSpecimenByOpusId}/${id}`;
      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
      };
      const response = await fetch(url, config);
      const data = await response.json();
      this.SpecimenData = data.data;
    },
    async getEverythingBySpecimenId(id) {
      let url = `${this.storeUrl.urlEverythingBySpecimenId}/${id}`;
      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
      };
      const response = await fetch(url, config);
      const data = await response.json();
      this.LoanignData = data.data;
    },
    async getEverything() {
      let url = this.storeUrl.urlEverything;
      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
      };
      const response = await fetch(url, config);
      const data = await response.json();
      this.LoanignData = data.data;
    },
    async getOpusById(id) {
      let url = `${this.storeUrl.urlOpus}/${id}`;
      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.storeLogin.accessToken}`,
        },
      };
      const response = await fetch(url, config);
      const data = await response.json();
      this.edittableData = data.data;
    },
    onClickSelectOpus(id) {
      console.log(id);
      this.currentDataId = null;
      this.currentId = id;
      this.getSpecimenById(id);
    },
    onClickSelectSpecimen(id) {
      console.log(id);
      this.currentDataId = null;
      this.currentId = id;
      this.getEverythingBySpecimenId(id);
    },
    currentRowBackground(id) {
      return this.currentId == id ? "my-bg-current-row" : "";
    },
  },
  computed: {
    filteredData:function(){
      if (!this.query) {
        return this.Data;
      }else {
        let what = new RegExp(this.query, "gi");
        var self = this;
        return self.Data.filter(function(val){
          return val.writer.match(what) || val.title.match(what);
        })
      }
    },
  },
};
</script>

<template>
  <div>
    <div id="searchbarcontainer" class="w-25">
      <h1>Könyvkölcsönzés</h1>

      <form class="d-flex" role="search">
        <input class="form-control me-2" v-model="query" type="input" placeholder="Search" aria-label="Search" />
      </form>

    </div>
    
    <div class="column">
      <table class="table table-dark table-striped table-hover table-sm">
        <thead>
            <tr>
                <th>Könyvek</th>
                <th></th>
                <!-- <th></th> -->
            </tr>
          <tr>
            <th>Író</th>
            <th>Cím</th>
            <!-- <th></th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(opus, index) in filteredData" :key="`opus${index}`"
          :class="currentRowBackground(opus.id)"
          @click="onClickSelectOpus(opus.id)">
            <td>{{ opus.writer }}</td>
            <td>{{ opus.title }}</td>
            <!-- <td><button type="button" class="btn btn-secondary" >
              <i class="bi bi-bag-plus-fill"></i></button></td> -->
            
          </tr>
        </tbody>
      </table>
    </div>

    <div class="dynamic-column">
      <table class="table table-dark table-striped table-sm">
        <thead>
            <tr>
                <th>Példányok</th>
                <th></th>
            </tr>
          <tr>
            <th>Ár</th>
            <th>Beszerzés</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(specimen, index) in SpecimenData" :key="`specimen${index}`"
          :class="currentRowBackground(specimen.sId)"
          @click="onClickSelectSpecimen(specimen.sId)">
            <td>{{ specimen.price }}</td>
            <td>{{ specimen.acquisition }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="dynamic-column">
      <table class="table table-dark table-striped table-sm">
        <thead>
            <tr>
                <th>Kölcsönzés</th>
                <th></th>
                <th></th>
            </tr>
          <tr>
            <th>Diák</th>
            <th>Tól</th>
            <th>Ig</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="(loaning, index) in LoanignData" :key="`loaning${index}`">
            <td>{{ loaning.name }}</td>
            <td>{{ loaning.away }}</td>
            <td>{{ loaning.back }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <nav aria-label="Page navigation example" class="d-none">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <a class="page-link">Previous</a>
        </li>
        <li class="page-item">
          <RouterLink class="page-link" to="/home">1</RouterLink>
        </li>
        <li class="page-item">
          <RouterLink class="page-link" to="/homesecond">2</RouterLink>
        </li>
        <li class="page-item">
          <RouterLink class="page-link" to="/homethird">3</RouterLink>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav> -->
    
  </div>
</template>

<style scoped>
h1 {
  color: white;
  text-align: center;
}

.column {
    float: left;
    width: 33%;
    padding: 5px;
    overflow-y: scroll;
    height: 750px;
}

.dynamic-column {
    float: left;
    width: 33%;
    padding: 5px;
    height: 750px;
}

h1 {
    margin-bottom: 50px;
}

.my-bg-current-row {
  /* background-color: lightgrey; */
  background-color: green !important;
}

/* .my-table-bg {
  background-color: #1f1f2e;
} */

/* #datatable {
  float: left;
  height: 80vh;
  overflow-y: scroll;
}

#datatable2 {
  height: 80vh;
  overflow-y: scroll;
}

#datatable3 {
    float: right;
    height: 80vh;
    overflow-y: scroll;
} */
/* #searchbarcontainer{
  margin: auto;
} */
</style>