import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return <div>
    <div class="hero min-h-screen bg-gradient-to-r from-red-500 to-red-800 ">
      <div class="hero-content text-center">
      <div class="max-w-md">
      <h1 class="text-9xl font-bold">OOPs!</h1>
      <h2 class="text-5xl"> 404:Page not Found</h2>
      <p class="py-6">Sorry, the page you are trying to access does not exist. Try the ones below.</p>
      <div class="flex justify-around">
        <Link href="/" class="btn btn-success text-lg glass">Home</Link>
        <Link href="/login" class="btn btn-success text-lg glass">Login</Link>
        <Link href="/explore" class="btn btn-success text-lg glass">Explore</Link>
      </div>
    </div>
      </div>
    </div>
  </div>
})