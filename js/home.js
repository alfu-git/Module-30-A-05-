// get id
const getId = (id) => {
  return document.getElementById(id);
}

// all the variable
const allIssueContainer = getId('all-issue-container');
const totalIssue = getId('total-issue');
const spinner = getId('spinner');
const issueModal = getId('issue-modal');
const modalContainer = getId('modal-container');

// all the array
let allIssueArr = [];

// create function to set total-issue
const setTotalIssue = () => {
  totalIssue.innerText = allIssueArr.length;
}

// create function to set spinner
const setSpinner = (status) => {
  if(status) {
    spinner.classList.replace('hidden', 'flex');
  }
  else {
    spinner.classList.replace('flex', 'hidden');
  }
}

// load all issue
const loadAllIssue = async() => {
  setSpinner(true);

  const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
  const res = await fetch(url);
  const data = await res.json();

  setSpinner(false);

  displayAllIssue(data.data);
}
loadAllIssue();

// create function for convert dateObj to local date string
const convertDate = (date) => {
    const dateObj = new Date(date);
    const dateSting = dateObj.toLocaleDateString('en-GB');
    return dateSting;
}

// create function to display the issue labels in UI dynamically
const setLabels = (arr) => {
  const labelHtml = arr.map((label) => 
    `<span class="py-0.5 px-2 text-[12px] border rounded-full ${
      label === 'bug' ? 
      'text-[#EF4444] bg-[#FEECEC] border-[#FECACA]' : 
      label === 'help wanted' ? 
      'text-[#D97706] bg-[#FFF8DB] border-[#FDE68A]' : 
      label === 'enhancement' ? 'text-[#00A96E] bg-[#DEFCE8] border-[#BBF7D0]' : 
      'text-[#DB2777] bg-[#FCE7F3] border-[#FBCFE8]'
    }">

        ${
          label === 'bug' ? 
          '<i class="fa-solid fa-bug"></i>' : 
          label === 'help wanted' ? 
          '<i class="fa-solid fa-life-ring"></i>' : 
          label === 'enhancement' ? 
          '<i class="fa-solid fa-wand-magic-sparkles"></i>' : 
          '<i class="fa-brands fa-gg"></i>'
        } ${label.toUpperCase()}

      </span>`);

  return labelHtml.join(' ');
}

// display all issue
const displayAllIssue = (issueData) => {
  allIssueContainer.innerHTML = "";

  issueData.forEach((data) => {
    // set total issue
    allIssueArr.push(data);
    setTotalIssue();

    // createdAT convert to local date

    // create issueCard & then append the card in allIssueContainer
    const issueCard = document.createElement('div');
    issueCard.onclick = () => openModal(data.id);
    issueCard.className = `p-4 bg-base-100 rounded-sm shadow-md border-t-3 ${data.status === 'open' ? 'border-[#00A96E]' : 'border-[#A855F7]'}`;

    issueCard.innerHTML = `
      <div class="mb-3 flex justify-between items-center">
        <span class="p-1 w-7 h-7 rounded-full flex justify-center items-center ${
          data.status === 'open' ? 
          'bg-[#CBFADB] text-[#00A96E]' : 
          'bg-[#F0E2FF] text-[#A855F7]'
        }">
          ${
            data.status === 'open' ? 
            '<i class="fa-regular fa-circle"></i>' : 
            '<i class="fa-regular fa-circle-check"></i>'
          }
        </span>

        <span class="py-1 px-3 text-sm rounded-full ${
          data.priority === 'high' ? 
          'bg-[#FEECEC] text-[#EF4444]' : 
          data.priority === 'medium' ? 
          'bg-[#FFF6D1] text-[#F59E0B]' : 
          'bg-[#EEEFF2] text-[#9CA3AF]'
        } ">
          ${data.priority.toUpperCase()}
        </span>
      </div>

      <h2 class="mb-2 text-[#1F2937] text-sm font-semibold">${data.title}</h2>
      <p class="line-clamp-2 mb-3 text-[#64748B] text-[12px]">${data.description}</p>
              
      <div class="flex flex-wrap gap-1.5">
        ${setLabels(data.labels)}  
      </div>

      <div class="mt-4 pt-4 border-t border-gray-400">
        <span class="block mb-2 text-[#64748B] text-[12px]">#1 ${data.author}</span>
        <span class="inline-block text-[#64748B] text-[12px]">${convertDate(data.createdAt)}</span>
      </div>
    `;
    allIssueContainer.appendChild(issueCard);
  })
}

// set modal function
const openModal = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const modalData = data.data;

  modalContainer.innerHTML = "";

  const modalCard = document.createElement('div');
  modalCard.innerHTML = `
    <h3 class="mb-2 text-[#1F2937] text-2xl font-bold">${modalData.title}</h3>
    <div class="flex gap-1 items-center">
      <span class="inline-block py-0.5 px-3 rounded-full text-sm text-base-100 ${
        modalData.status === 'open' ?  
        'bg-[#00A96E]': 
        'bg-[#A855F7]'
      }">
        ${
          modalData.status === 'open' ? 
          modalData.status.charAt(0).toUpperCase() + modalData.status.slice(1) + 'ed' :
          modalData.status.charAt(0).toUpperCase() + modalData.status.slice(1)
        }
      </span>
      <span class="inline-block text-3xl">•</span>
      <span class="inline-block">Opened by <span>${modalData.author}</span></span>
      <span class="inline-block text-3xl">•</span>
      <span class="inline-block">${convertDate(modalData.createdAt)}</span>
    </div>

    <div class="mt-7 mb-6 space-x-1.5">
      ${setLabels(modalData.labels)}
    </div>

    <p class="my-6 text-[#64748B]">${modalData.description}</p>

    <div class="p-4 bg-[#F8FAFC] flex justify-between">
      <div>
        <span class="block text-[64748B]">Assignee:</span>
        <span class="inline-block text-[#1F2937] font-semibold">${
            modalData.assignee !== '' ? 
            modalData.assignee :
            'No Assignee'
          }
        </span>
      </div>

      <div class="mr-6">
        <span class="block text-[64748B]">Priority:</span>
        <span class="text-sm font-semibold ${
          modalData.priority === 'high' ? 
          'text-[#EF4444]' : 
          modalData.priority === 'medium' ? 
          'text-[#F59E0B]' : 
          'text-[#9CA3AF]'
        } ">${modalData.priority.toUpperCase()}</span>
      </div>
    </div>
  `;
  modalContainer.appendChild(modalCard);

  issueModal.showModal();
}