         function createDom(){
          var count = $("#gCount").val();
          var dom = "";
          for(i=1;i<=count;i++)
          {
           dom += "<br/>Member "+i+" : <input id='gmName"+i+"' type='text' placeholder='Name'></input>";
          }
           $("#panel2").html(dom);
        }

        $(document).ready(function(){
            window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

            var request, db;
            
            if(!window.indexedDB)
            {
                console.log("Your Browser does not support IndexedDB");
            }
            else
            {
                console.log("Welcome to indexedDB");
                request = window.indexedDB.open("hisaab2DB2", 2);
                request.onerror = function(event){
                    console.log("Error opening DB", event);
                }
                request.onupgradeneeded = function(event){
                    console.log("Upgrading");
                    db = event.target.result;
                    var objectStore = db.createObjectStore("hisaab2", { keyPath : "bNo" });
                };
                request.onsuccess = function(event){
                    console.log("Success opening DB");
                    db = event.target.result;
                }
            }
            
            $("#addBtn").click(function(){
                var bNo = $("#bNo").val();
                var name = $("#name").val();
                
                var transaction = db.transaction(["hisaab2"],"readwrite");
                transaction.oncomplete = function(event) {
                    console.log("Success :)");
                    $("#result").html("Add : Success");
                };
                
                transaction.onerror = function(event) {
                    console.log("Error :(");
                    $("#result").html("Add : Error");
                };
                var objectStore = transaction.objectStore("hisaab2");
                
                objectStore.add({bNo: bNo, name: name});
            });
            
            $("#removeBtn").click(function(){
                var bNo = $("#bNo").val();
                db.transaction(["hisaab2"],"readwrite").objectStore("hisaab2").delete(bNo);
            });

            $("#getBtn").click(function(){
                var bNo = $("#bNo").val();
                var request = db.transaction(["hisaab2"],"readwrite").objectStore("hisaab2").get(bNo);
                request.onsuccess = function(event){
                    $("#result").html("name : "+request.result.name);
                };
            });
            
            $("#updateBtn").click(function(){
                var bNo = $("#bNo").val();
                var name = $("#name").val();
                var transaction = db.transaction(["hisaab2"],"readwrite");
                var objectStore = transaction.objectStore("hisaab2");
                var request = objectStore.get(bNo);
                request.onsuccess = function(event){
                    $("#result").html("Updating : "+request.result.name + " to " + name);
                    request.result.name = name;
                    objectStore.put(request.result);
                };
            });
        });
