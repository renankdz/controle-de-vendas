entrada = [1, -2, "3", None, 5, 0, 8]
def filtrar_valores_validos(lista):
    total = 0
    for item in lista:
        if type(item) == int and item > 0:
            total += item
    return total
