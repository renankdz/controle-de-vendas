// =====================
// UTILITÁRIOS
// =====================
function getVendas() {
    return JSON.parse(localStorage.getItem('vendas')) || [];
}

function setVendas(vendas) {
    localStorage.setItem('vendas', JSON.stringify(vendas));
}

// =====================
// CADASTRO
// =====================
function salvarVenda(event) {
    event.preventDefault();

    const produto = document.getElementById('produto').value;
    const qtd = parseInt(document.getElementById('qtd').value);
    const preco = parseFloat(document.getElementById('preco').value);

    if (!produto || qtd <= 0 || isNaN(preco) || preco <= 0) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    const venda = {
        produto,
        qtd,
        preco,
        data: new Date().toLocaleDateString('pt-BR')
    };

    const vendas = getVendas();
    vendas.push(venda);
    setVendas(vendas);

    alert('Venda cadastrada com sucesso!');
    document.querySelector('form').reset();
}

// =====================
// LISTAGEM
// =====================
function exibirVendas() {
    const tbody = document.querySelector('tbody');
    if (!tbody) return;

    const vendas = getVendas();
    let total = 0;
    tbody.innerHTML = '';

    vendas.forEach((venda, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${venda.produto}</td>
            <td>${venda.qtd}</td>
            <td>R$ ${venda.preco.toFixed(2)}</td>
            <td>${venda.data}</td>
            <td><button onclick="deletarVenda(${index})">Deletar</button></td>
        `;
        tbody.appendChild(row);
        total += venda.qtd * venda.preco;
    });

    const totalEl = document.getElementById('total');
    if (totalEl) {
        totalEl.textContent = `Total Vendido: R$ ${total.toFixed(2)}`;
    }
}

// =====================
// DASHBOARD
// =====================
function atualizarDashboard() {
    const resumo = document.getElementById('resumo-total');
    if (!resumo) return;

    const vendas = getVendas();
    let total = 0;

    vendas.forEach(venda => {
        total += venda.qtd * venda.preco;
    });

    resumo.textContent = `Total de Vendas: R$ ${total.toFixed(2)} (${vendas.length} vendas)`;
}

// =====================
// DELETE
// =====================
function deletarVenda(index) {
    const vendas = getVendas();
    vendas.splice(index, 1);
    setVendas(vendas);
    exibirVendas();
    atualizarDashboard();
}

// =====================
// INIT
// =====================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', salvarVenda);
    }

    exibirVendas();
    atualizarDashboard();
});
