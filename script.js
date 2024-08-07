const counters = {
  important: 1,
  note: 1,
  daily: 1,
  all: 1,
};
document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-button");
  addButton.addEventListener("click", (event) => {
    const input = document.getElementById("input"),
      inputValue = input.value;

    switch (inputValue) {
      case "":
        alert("Please enter a task.");
        break;
      default:
        const tabPageUlListIds = [
          "important-page",
          "note-page",
          "all-page",
          "daily-page",
        ];

        const [importantPage, notePage, allPage, dailyPage] =
          tabPageUlListIds.map((tabPageUlListIds) => {
            return document.getElementById(tabPageUlListIds);
          });

        const buttonIds = [
          "imp-button",
          "note-button",
          "daily-button",
          "all-button",
        ];

        const [impButton, noteButton, dailyButton, allButton] = buttonIds.map(
          (id) => {
            return document.getElementById(id);
          }
        );

        const category = document.getElementById("category"),
          categoryValue = category.value;

        if (["important", "note", "daily", "all"].includes(categoryValue)) {
          const pages = {
            important: importantPage,
            note: notePage,
            daily: dailyPage,
            all: allPage,
          };

          addItemToPage(pages[categoryValue], inputValue, categoryValue);

          if (categoryValue !== "all") {
            addItemToPage(allPage, inputValue, "all");
          }

          openPage(impButton, categoryValue);
        }

        const contentPage = Object.assign(
          document.getElementById("todo-list-content"),
          {
            className: "",
          }
        );
        Object.assign(contentPage.style, {
          display: "Block",
        });

        input.value = "";

        let pageId;
        let detailsId = "total";
        switch (categoryValue) {
          case "important":
            pageId = "important-page";
            updateDetails(pageId, detailsId);
            break;
          case "all":
            pageId = "all-page";
            updateDetails(pageId, detailsId);
            break;
          case "daily":
            pageId = "daily-page";
            updateDetails(pageId, detailsId);
            break;
          case "note":
            pageId = "note-page";
            updateDetails(pageId, detailsId);
            break;
        }
        break;
    }
  });
});

function openPage(event, tabPageId, targetId) {
  var tabcontent = document.getElementsByClassName("tab-content");

  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  const page = document.getElementById(tabPageId);
  Object.assign(page.style, {
    display: "block",
  });

  const contentTitle = Object.assign(document.getElementById("content-title"), {
    className: "content-title",
    textContent: tabPageId,
  });

  Object.assign(contentTitle.style, {
    textTransform: "capitalize",
  });

  let pageId;
  let detailsId = "total";

  switch (targetId) {
    case "imp-button":
      pageId = "important-page";
      updateDetails(pageId, detailsId);
      break;
    case "all-button":
      pageId = "all-page";
      updateDetails(pageId, detailsId);
      break;
    case "daily-button":
      pageId = "daily-page";
      updateDetails(pageId, detailsId);
      break;
    case "note-button":
      pageId = "note-page";
      updateDetails(pageId, detailsId);
      break;
  }
}

const addItemToPage = (page, inputValue, categoryValue) => {
  const numberedInputValue = `${counters[categoryValue]}. ${inputValue}`;
  counters[categoryValue]++;

  const lineDiv = Object.assign(document.createElement("div"), {
    className: "tabPageLayout",
    textContent: numberedInputValue,
  });

  const deleteButtonDiv = Object.assign(document.createElement("div"), {
    className: "delete-button",
  });

  const spanDelete = Object.assign(document.createElement("span"), {
    className: "material-symbols-outlined",
    textContent: "delete",
  });

  deleteButtonDiv.append(spanDelete);

  deleteButtonDiv.addEventListener("click", () => {
    lineDiv.remove();
    counters[categoryValue]--;
  });

  const confirmButtonDiv = Object.assign(document.createElement("div"), {
    className: "confirm-button",
  });

  const spanConfirm = Object.assign(document.createElement("span"), {
    className: "material-symbols-outlined",
    textContent: "check_circle",
    id: "confirm",
  });

  confirmButtonDiv.append(spanConfirm);

  confirmButtonDiv.addEventListener("click", () => {
    lineDiv.classList.toggle("completed");
  });

  const wrapperDiv = Object.assign(document.createElement("div"), {
    className: "wrapper-div",
  });

  wrapperDiv.append(deleteButtonDiv, confirmButtonDiv);

  lineDiv.appendChild(wrapperDiv);

  page.appendChild(lineDiv);
};

const updateDetails = (pageId, detailsId) => {
  const page = document.getElementById(pageId);
  const countClass = page.querySelectorAll(".tabPageLayout");
  const length = countClass.length;
  const detailsTotal = document.getElementById(detailsId);
  detailsTotal.textContent = length;
};
