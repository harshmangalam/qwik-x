import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PageHeader } from "~/components/page-header";
import { User } from "~/components/user";
import { fetchAllUserSuggestions } from "~/utils/users";

export const useSuggestions = routeLoader$(async (requestEvent) => {
  const urlParams = new URLSearchParams(requestEvent.url.search);
  const page = Number(urlParams.get("page")) || 1;
  const limit = Number(urlParams.get("limit")) || 10;

  return fetchAllUserSuggestions(requestEvent, page, limit);
});

export default component$(() => {
  // Pagination state
  const currentPageSig = useSignal(1);
  const totalPagesSig = useSignal(1); // Set this value based on your API response
  const limit = 10; // You can allow this to be dynamic too if needed

  const usersSig = useSuggestions();

  useVisibleTask$(({ track }) => {
    // eslint-disable-next-line qwik/valid-lexical-scope
    track(() => usersSig.value); 
    // Assuming API provides total items to calculate pages
    // eslint-disable-next-line qwik/valid-lexical-scope
    totalPagesSig.value = Math.ceil(usersSig.value.length / limit); // Assuming API gives total count
  });

  // Handle page change
  const goToPage$ = $((newPage: unknown) => {
    currentPageSig.value = newPage as unknown as number;
    const url = new URL(window.location.href);
    url.searchParams.set("page", newPage as string);
    window.history.pushState({}, "", url); // Update the URL without reloading the page
    window.location.reload(); // Reload to fetch new data (can be improved with state management)
  });

  return (
    <div>
      <PageHeader title="Suggestions" />
      <ul class="rounded-box flex flex-col bg-base-100">
        {usersSig.value.map((user) => (
          <li key={user.id} class="hover:bg-base-200 py-2 px-4">
            <User key={user.id} {...user} />
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div class="mt-4 flex justify-center space-x-2">
        <button 
          disabled={currentPageSig.value === 1} 
          onClick$={() => goToPage$(currentPageSig.value - 1)} 
          class="btn"
        >
          Previous
        </button>
        <span>Page {currentPageSig.value} of {totalPagesSig.value}</span>
        <button 
          disabled={currentPageSig.value === totalPagesSig.value} 
          onClick$={() => goToPage$(currentPageSig.value + 1)} 
          class="btn"
        >
          Next
        </button>
      </div>
    </div>
  );
});


// Keeping old codes for reference

// export default component$(() => {
//   const usersSig = useSuggestions();
//   return (
//     <div>
//       <PageHeader title="Suggestions" />
//       <ul class="rounded-box flex flex-col bg-base-100">
//         {usersSig.value.map((user) => (
//           <li key={user.id} class="hover:bg-base-200 py-2 px-4">
//             <User key={user.id} {...user} />
//           </li>
//         ))}
//       </ul>


//     </div>
//   );
// });
