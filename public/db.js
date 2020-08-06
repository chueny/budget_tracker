let request = window.indexedDB.open("budget", 1);
// create a new db request for a "budget" database.

request.onupgradeneeded = function(event) {
  const db = event.target.result;
  // create object store called "pending" and set autoIncrement to true
  const budgetStore= db.ObjectStore("pending", {autoIncrement: true});

};

request.onsuccess = function(event) {
  db = target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function(event) {
  // log error here
};

function saveRecord(record) {
  // create a transaction on the pending db with readwrite access
  // access your pending object store
  // add record to your store with add method.
  const transaction = db.transaction(["budget"], "readwrite");
  const budgetStore = transaction.ObjectStore("budget");

  budgetStore.add({});
  budgetStore.add({});
  budgetStore.add({});

}

function checkDatabase() {
  // open a transaction on your pending db
  // access your pending object store
  // get all records from store and set to a variable
  const getCursorRequest = budgetStore.openCursor();
  getCursorRequest.on.success = e => {
    const cursor = e.target.result;
    // if (cursor) {
    //   if 
    // };

  }


  getAll.onsuccess = function() {
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(() => {
          // if successful, open a transaction on your pending db
          // access your pending object store
          // clear all items in your store
      });
    }
  };
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);