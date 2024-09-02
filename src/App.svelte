<script>
	import Login from "./pages/Login.svelte";
	import Signup from "./pages/Signup.svelte";
	import Home from "./pages/Home.svelte";
	import ErrorPage from "./pages/ErrorPage.svelte";
  
	import Router from 'svelte-spa-router';

	const routes = {
		'/' : Home,
		'/login' : Login,
		'/signup' : Signup,
		'/error' : ErrorPage
	};
</script>

<Router {routes} />
