


$("#add_note").submit(function(event){
    alert("Note added successfully!");
})

$("#update_note").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `https://my-notes-taking-app.herokuapp.com/api/notes/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Note Updated Successfully!");
    })

})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
          url: `https://my-notes-taking-app.herokuapp.com/api/notes/${id}`,
          method: "DELETE",
        };

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert(response.message);
                location.reload();
            })
        }

    })
}