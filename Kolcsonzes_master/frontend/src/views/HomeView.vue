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

export default {
  data() {
    return {
      storeUrl,
      storeLogin,
      Data: [],
      currentDataId: null,
      edittableData: new Data(),
      form: null,
      // state: "view",
      currentId: null,
      query: null,
    };
  },
  mounted() {
    this.getOpus();
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
    onClikRow(id) {
      this.currentId = id;
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
    <div id="searchbarcontainer" class="w-75">
      <h1>Könyveink</h1>

      <form class="d-flex" role="search">
        <input class="form-control me-2" v-model="query" type="input" placeholder="Search" aria-label="Search" />
      </form>

    </div>
    

    <div id="datatable" class="w-75">
      <table class="table table-dark table-striped table-sm">
        <thead>
          <tr>
            <th>Író</th>
            <th>Cím</th>
            <th>Év</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(opus, index) in filteredData" :key="`opus${index}`">
            <td>{{ opus.writer }}</td>
            <td>{{ opus.title }}</td>
            <td>{{ opus.year }}</td>
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

#datatable {
  margin: auto;
  height: 80vh;
  overflow-y: scroll;
}

#searchbarcontainer{
  margin: auto;
}
</style>
