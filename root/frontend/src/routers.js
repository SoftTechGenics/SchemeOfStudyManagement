import { createRouter, createWebHistory } from "vue-router";
import HomePage from './components/HomePage'
import CreateCourse from './components/CreateCourse'
import CoursesDetails from './components/CoursesDetails'
import UpdateCourse from './components/UpdateCourse'



const routes = [
    {
        path : '/',
        name : 'homepage',
        component : HomePage
    },
    {
        path : '/createcourse',
        name : 'createcourse',
        component : CreateCourse
    },
    {
        path : '/details/:id',
        name : 'details',
        component : CoursesDetails,
        props:true
    },
    {
        path : '/update/:id',
        name : 'update',
        component : UpdateCourse,
        props:true
    }
]


const router = createRouter({
    history : createWebHistory(),
    routes, 
})


export default router;