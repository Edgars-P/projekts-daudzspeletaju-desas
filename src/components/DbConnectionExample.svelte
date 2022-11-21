<script>

  // Vispirms mēs savācam visu ārējo kodu kas ir nepieciešams tālākām darbībām
  import PocketBase from 'pocketbase';  // Datubāze
  import { onMount } from 'svelte';     // Izmanto lai palaistu kodu tiklīdz lapa ielādējas


  // Tālāk mēs uztaisam mainīgo count kuru izmantosim skaitlim
  let count = 0
  // Un mēs to vievietojam HTML lapā daudz zemāk


  onMount(() => {
    // Tālāk tiklīdz kods ir ieādējies interneta pārlūkā
    // Mēs izveidojam savienojumu ar datubāzi
    const pb = new PocketBase('https://db.0xff.lv');

    // Mēs uzreiz palūdzam datubāzei skaitli
    pb.collection('counter').getOne('ubmmxhbfel7r60o', {})
    // Un to parādam lietotājam
    .then(x => count = x.number)


    //Kā arī palūdzam mums pateikt ja tas skaitlis izmainās nākotnē
    pb.collection('counter').subscribe('ubmmxhbfel7r60o', (newCount) => {
      // Un to parādam lietotājam
      count = newCount.record.number
    })



    // Un izveidojam funkciju lai katru reizi kad ir nospiesta poga
    // Datubāzes skaitlis tiek atjaunināts
    increaseCount = () => {
      pb.collection('counter').update('ubmmxhbfel7r60o', {number: count+1});
    }

  })

  let increaseCount = () => {}

</script>


<p>
  <!-- Ievietojam šeit! -->
  Skaitlis ir: {count}

  <!-- Un uztaisam pogu lai to palielinātu -->
  <button on:click={increaseCount}>Palielināt!</button>
</p>