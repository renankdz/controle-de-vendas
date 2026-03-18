// =========================
// DADOS (localStorage)
// =========================
function getVendas() {
    return JSON.parse(localStorage.getItem('vendas')) || [];
}

function setVendas(vendas) {
    localStorage.setItem('vendas', JSON.stringify(vendas));
}

// =========================
// CONTROLE DE EDIÇÃO
// =========================
let indiceEmEdicao = null;

// =========================
// AÇÕES
// =========================
function salvarVenda(event) {
    event.preventDefault();

    const produto = document.getElementById('produto').value;
    const qtd = parseInt(document.getElementById('qtd').value);
    const preco = parseFloat(document.getElementById('preco').value);

    if (!produto || qtd <= 0 || preco <= 0 || isNaN(preco)) {
        alert('Preencha todos os campos corretamente');
        return;
    }

    const venda = {
        produto,
        qtd,
        preco,
        data: new Date().toLocaleDateString('pt-BR')
    };

    const vendas = getVendas();

    if (indiceEmEdicao !== null) {
        vendas[indiceEmEdicao] = venda;
        indiceEmEdicao = null;
    } else {
        vendas.push(venda);
    }

    setVendas(vendas);

    document.querySelector('#form-venda').reset();
    exibirVendas();
    atualizarDashboard();
}

// =========================
// EDITAR / EXCLUIR
// =========================
function editarVenda(index) {
    const vendas = getVendas();
    const venda = vendas[index];

    document.getElementById('produto').value = venda.produto;
    document.getElementById('qtd').value = venda.qtd;
    document.getElementById('preco').value = venda.preco;

    indiceEmEdicao = index;
}

function deletarVenda(index) {
    const vendas = getVendas();

    if (!confirm('Deseja realmente excluir esta venda?')) return;

    vendas.splice(index, 1);
    setVendas(vendas);
    exibirVendas();
    atualizarDashboard();
}

// =========================
// TELAS
// =========================
function exibirVendas() {
    const tbody = document.querySelector('tbody');
    if (!tbody) return;

    const vendas = getVendas();
    let total = 0;
    tbody.innerHTML = '';

    vendas.forEach((venda, index) => {
        total += venda.qtd * venda.preco;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${venda.produto}</td>
            <td>${venda.qtd}</td>
            <td>R$ ${venda.preco.toFixed(2)}</td>
            <td>${venda.data}</td>
            <td>
                <button class="btn-editar" data-index="${index}">Editar</button>
                <button class="btn-excluir" data-index="${index}">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    const totalEl = document.getElementById('total');
    if (totalEl) {
        totalEl.textContent = `Total Vendido: R$ ${total.toFixed(2)}`;
    }
}

function atualizarDashboard() {
    const resumo = document.getElementById('resumo-total');
    if (!resumo) return;

    const vendas = getVendas();
    let total = 0;

    vendas.forEach(v => {
        total += v.qtd * v.preco;
    });

    resumo.textContent = `Total de Vendas: R$ ${total.toFixed(2)} (${vendas.length} vendas)`;
}

// =========================
// EVENTOS
// =========================
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-excluir')) {
        deletarVenda(e.target.dataset.index);
    }

    if (e.target.classList.contains('btn-editar')) {
        editarVenda(e.target.dataset.index);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form-venda');
    if (form) {
        form.addEventListener('submit', salvarVenda);
    }

    exibirVendas();
    atualizarDashboard();
});
