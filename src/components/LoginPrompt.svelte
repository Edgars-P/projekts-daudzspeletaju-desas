<script>

    function pierakstities() {

    }

</script>


<div>
    <form on:submit={pierakstities}>
        <label for="user">
            Lietotājvārds:
            <input type="text" id="user" name="user"><br>
        </label>
        <label for="pwd">
            Parole:
            <input type="password" id="pwd" name="pwd"><br>
        </label>
        
        <input type="submit" value="Pierakstīties">
        <button>Reģistrēties</button>
    </form>
</div>
