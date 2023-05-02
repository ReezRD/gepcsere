import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: {
        requiresAuth: false,
        title: "Home / Books",
      },
    },
    {
      path: "/specimen",
      name: "specimen",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/SpecimenView.vue"),
      meta: {
        requiresAuth: false,
        title: "Specimen / Books",
      },
    },
    {
      path: "/taxiFuvarjai",
      name: "taxiFuvarjai",
      component: () => import("../views/TaxiFuvarjaiView.vue"),
      meta: {
        requiresAuth: false,
        title: "Taxi fuvarjai / Books",
      },
    },
    {
      path: "/taxiKezeles",
      name: "taxiKezeles",
      component: () => import("../views/TaxiKezelesView.vue"),
      meta: {
        requiresAuth: true,
        title: "Taxi Kezelés / Books",
      },
    },
    {
      path: "/loanings",
      name: "loanings",
      component: () => import("../views/LoaningView.vue"),
      meta: {
        requiresAuth: false,
        title: "Loanings / Books",
      },
    },
    {
      path: "/students",
      name: "students",
      component: () => import("../views/StudentView.vue"),
      meta: {
        requiresAuth: false,
        title: "Students / Books",
      },
    },
    {
      path: "/homesecond",
      name: "homesecond",
      component: () => import("../views/HomeViewSecondPage.vue"),
      meta: {
        requiresAuth: false,
        title: "Homesecond / Books",
      },
    },
    {
      path: "/homethird",
      name: "homethird",
      component: () => import("../views/HomeViewThirdPage.vue"),
      meta: {
        requiresAuth: false,
        title: "Homethird / Books",
      },
    },
    {
      path: "/studentsecond",
      name: "studentsecond",
      component: () => import("../views/StudentViewSecondOffset.vue"),
      meta: {
        requiresAuth: false,
        title: "Studentsecond / Books",
      },
    },
    {
      path: "/studentthird",
      name: "studentthird",
      component: () => import("../views/StudentViewThirdOffset.vue"),
      meta: {
        requiresAuth: false,
        title: "Studentthird / Books",
      },
    },
    {
      path: "/studentfourth",
      name: "studentfourth",
      component: () => import("../views/StudentViewFourthOffset.vue"),
      meta: {
        requiresAuth: false,
        title: "Studentfourth / Books",
      },
    },
    {
      path: "/geturebook",
      name: "geturebook",
      component: () => import("../views/GetUreBookView.vue"),
      meta: {
        requiresAuth: false,
        title: "GetUreBook / Books",
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        requiresAuth: false,
        title: "Login / Books",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "PageNotFound",
      component: () => import("../views/404View.vue"),
      meta: {
        requiresAuth: false,
        title: "404 / Books",
      },
    },
  ],
});

export default router;
