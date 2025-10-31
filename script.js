const sampleArticles = [
  {
    id: 1,
    title: '근로계약의 필수 항목 정리',
    summary: '근로계약서에 꼭 들어가야 할 항목과 체크포인트를 쉽게 정리했습니다.',
    source: 'https://www.moel.go.kr',
    tags: ['근로', '계약']
  },
  {
    id: 2,
    title: '이혼 시 재산 분할 핵심 포인트',
    summary: '재산분할 기준과 실무에서 자주 묻는 질문을 정리했습니다.',
    source: 'https://www.scourt.go.kr',
    tags: ['가사', '이혼']
  },
  {
    id: 3,
    title: '손해배상 청구 절차 가이드',
    summary: '민사 소송 전 준비해야 할 서류와 증거 수집 요령.',
    source: 'https://www.law.go.kr',
    tags: ['민사', '손해배상']
  }
];

const articlesContainer = document.getElementById('articlesContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalSummary = document.getElementById('modalSummary');
const modalLink = document.getElementById('modalLink');

function renderArticles(list) {
  articlesContainer.innerHTML = '';
  if (list.length === 0) {
    articlesContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
    return;
  }
  list.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h4>${item.title}</h4>
      <p>${item.summary}</p>
      <div style="margin-top:8px;display:flex;gap:8px;align-items:center">
        <small style="color:#6b7280">출처: ${item.source}</small>
        <button data-id="${item.id}" class="detailBtn" style="margin-left:auto;padding:6px 8px;border-radius:6px;border:1px solid #e5e7eb;background:#fff;cursor:pointer">자세히</button>
      </div>
    `;
    articlesContainer.appendChild(card);
  });
}

function openModal(id) {
  const article = sampleArticles.find(a => a.id === Number(id));
  if (!article) return;
  modalTitle.textContent = article.title;
  modalSummary.textContent = article.summary;
  modalLink.href = article.source;
  modal.classList.remove('hidden');
}

function closeModalFn() {
  modal.classList.add('hidden');
}

function doSearch() {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) {
    renderArticles(sampleArticles);
    return;
  }
  const result = sampleArticles.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.summary.toLowerCase().includes(q) ||
    a.tags.join(' ').toLowerCase().includes(q)
  );
  renderArticles(result);
}

searchBtn.addEventListener('click', doSearch);
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') doSearch();
});
articlesContainer.addEventListener('click', e => {
  const btn = e.target.closest('.detailBtn');
  if (btn) openModal(btn.dataset.id);
});
closeModal.addEventListener('click', closeModalFn);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModalFn();
});

const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  alert('문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.');
  contactForm.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
renderArticles(sampleArticles);