// ============================================================
// GENERADOR DE BANNERS - Motor de renderizado
// ============================================================

// ============================================================
// 1. FUNCIONES PARA GENERAR OFERTAS
// ============================================================

function generarOferta(numero) {
    const descuento = `descuento_${numero}`;
    const cencopay = `cencopay_${numero}`;
    const dinamica = `dinamica_${numero}`;
    const productos = `productos_${numero}`;

    return [
        {
            id: `ticket_${numero}`,
            type: "decorative",
            source: "imagenes/ticket.svg",
            position: { type: "relative", align: "center", marginTop: 5 },
            size: { width: 70, height: 55 },
            zIndex: 1
        },
        {
            id: `descuento_${numero}`,
            type: "text",
            content: `{{${descuento}}}`,
            position: { type: "over", target: `ticket_${numero}`, offsetY: -2 },
            typography: { fontSize: 28, color: "#ffffff", bold: true },
            zIndex: 2,
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            align: "center"
        },
        {
            id: `cencopay_${numero}`,
            type: "decorative",
            source: "imagenes/cencopay_base.svg",
            position: { type: "relative", after: `ticket_${numero}`, marginTop: 2, align: "center" },
            size: { width: 60, height: 20 }
        },
        {
            id: `cencopay_texto_${numero}`,
            type: "text",
            content: `{{${cencopay}}}`,
            position: { type: "over", target: `cencopay_${numero}`, offsetY: 0 },
            typography: { fontSize: 11, color: "#ffffff", bold: true },
            zIndex: 2,
            align: "center"
        },
        {
            id: `dinamica_${numero}`,
            type: "text",
            content: `{{${dinamica}}}`,
            position: { type: "relative", after: `cencopay_${numero}`, marginTop: 2 },
            typography: { fontSize: 9, color: "#ffffff" },
            align: "center"
        },
        {
            id: `productos_${numero}`,
            type: "text",
            content: `{{${productos}}}`,
            position: { type: "relative", after: `dinamica_${numero}`, marginTop: 3 },
            typography: { fontSize: 8, color: "#ffffff" },
            align: "center",
            maxLines: 3
        }
    ];
}

// ============================================================
// 2. DEFINICIÓN DE BANNER (Solo 160x600 por ahora)
// ============================================================

const banners = {
    "banner_160x600": {
        id: "banner_160x600",
        nombre: "160x600 - Vertical",
        width: 160,
        height: 600,
        background: "#ffffff",
        layout: { type: "vertical", padding: 0, gap: 0 },
        elementos: [
            // Cabezal
            {
                id: "cabezal",
                type: "group",
                position: "top",
                height: 80,
                background: "url('imagenes/fondo_cabezal.jpg')",
                backgroundSize: "cover",
                elements: [
                    {
                        id: "logo_oferta",
                        type: "image",
                        source: "{{logo_oferta}}",
                        position: { type: "fixed", align: "top", marginTop: 8, marginLeft: "center" },
                        size: { height: 30, width: "auto" }
                    },
                    {
                        id: "vigencia",
                        type: "text",
                        content: "{{vigencia}}",
                        position: { type: "fixed", align: "bottom", marginBottom: 5 },
                        typography: { fontSize: 8, color: "#ffffff", bold: true },
                        align: "center"
                    },
                    {
                        id: "logo_jumbo",
                        type: "image",
                        source: "imagenes/logo_jumbo.png",
                        position: { type: "fixed", align: "right", marginRight: 5, marginTop: 5 },
                        size: { height: 25, width: "auto" }
                    }
                ]
            },
            // Oferta 1
            {
                id: "oferta_1",
                type: "group",
                position: "after:cabezal",
                background: "#2e7d32",
                padding: 8,
                flex: 1,
                elements: generarOferta(1)
            },
            // Separador
            {
                id: "separador",
                type: "decorative",
                position: "after:oferta_1",
                height: 2,
                background: "#ffffff"
            },
            // Oferta 2
            {
                id: "oferta_2",
                type: "group",
                position: "after:separador",
                background: "#2e7d32",
                padding: 8,
                flex: 1,
                elements: generarOferta(2)
            },
            // Línea superior
            {
                id: "linea_superior",
                type: "decorative",
                position: "after:oferta_2",
                height: 1,
                background: "#ffffff",
                marginTop: 5
            },
            // Texto informativo
            {
                id: "texto_informativo",
                type: "group",
                position: "after:linea_superior",
                padding: 5,
                background: "#f5f5f5",
                elements: [
                    {
                        id: "texto_informativo_contenido",
                        type: "text",
                        content: "ENCONTRÁ ESTAS Y OTRAS OFERTAS TAMBIÉN EN",
                        typography: { fontSize: 7, color: "#333333", bold: true },
                        align: "center"
                    },
                    {
                        id: "imagen_acompanante",
                        type: "image",
                        source: "imagenes/texto_acompañante.png",
                        position: { type: "relative", after: "texto_informativo_contenido", marginTop: 2 },
                        size: { height: 15, width: "auto" },
                        align: "center"
                    }
                ]
            },
            // Línea inferior
            {
                id: "linea_inferior",
                type: "decorative",
                position: "after:texto_informativo",
                height: 1,
                background: "#ffffff",
                marginBottom: 5
            },
            // Legales
            {
                id: "legales",
                type: "text",
                content: "{{legales}}",
                position: "bottom",
                padding: 5,
                typography: { fontSize: 6, color: "#666666" },
                align: "center",
                maxLines: 2
            }
        ]
    }
};

// ============================================================
// 3. MOTOR DE RENDERIZADO
// ============================================================

function renderizarBanner(datos, reglas) {
    function reemplazarVariables(texto) {
        if (!texto) return "";
        let resultado = texto;
        for (const [key, value] of Object.entries(datos)) {
            resultado = resultado.replace(new RegExp(`{{${key}}}`, 'g'), value);
        }
        return resultado;
    }

    function renderizarElemento(el) {
        let html = "";
        const estiloBase = "display:flex; flex-direction:column; align-items:center; justify-content:center;";

        if (el.type === "text") {
            const contenido = reemplazarVariables(el.content || "");
            const fontSize = el.typography?.fontSize || 14;
            const color = el.typography?.color || "#000000";
            const bold = el.typography?.bold ? "bold" : "normal";
            const maxLines = el.maxLines || 0;
            const align = el.align || "center";
            const textShadow = el.textShadow || "none";

            const estiloTexto = `
                font-size: ${fontSize}px;
                color: ${color};
                font-weight: ${bold};
                text-align: ${align};
                ${maxLines > 0 ? `display: -webkit-box; -webkit-line-clamp: ${maxLines}; -webkit-box-orient: vertical; overflow: hidden;` : ''}
                ${textShadow !== "none" ? `text-shadow: ${textShadow};` : ''}
                padding: ${el.padding || 0}px;
                width: 100%;
            `;

            html += `<div style="${estiloTexto}">${contenido}</div>`;
        }

        if (el.type === "image") {
            const src = reemplazarVariables(el.source || "");
            const height = el.size?.height || 30;
            const width = el.size?.width || "auto";
            html += `<img src="${src}" style="height:${height}px; width:${width};" alt="Imagen">`;
        }

        if (el.type === "decorative") {
            const src = reemplazarVariables(el.source || "");
            const width = el.size?.width || 70;
            const height = el.size?.height || 55;
            html += `<img src="${src}" style="width:${width}px; height:${height}px; z-index:${el.zIndex || 1};" alt="Decorativo">`;
        }

        if (el.type === "group" && el.elements) {
            const padding = el.padding || 0;
            const background = el.background || "transparent";
            const flex = el.flex || 0;
            const estiloGroup = `
                ${estiloBase}
                padding: ${padding}px;
                background: ${background};
                ${flex ? `flex: ${flex};` : ''}
                ${el.height ? `height: ${el.height}px;` : ''}
                ${el.width ? `width: ${el.width};` : ''}
                gap: ${el.gap || 2}px;
                width: 100%;
            `;
            let contenidoGroup = "";
            for (const subEl of el.elements) {
                contenidoGroup += renderizarElemento(subEl);
            }
            html += `<div style="${estiloGroup}">${contenidoGroup}</div>`;
        }

        return html;
    }

    const padding = reglas.layout?.padding || 0;
    const gap = reglas.layout?.gap || 0;
    const direction = reglas.layout?.type === "horizontal" ? "row" : "column";

    let html = `
        <div class="banner" style="
            width: ${reglas.width}px;
            height: ${reglas.height}px;
            background: ${reglas.background || "#ffffff"};
            display: flex;
            flex-direction: ${direction};
            padding: ${padding}px;
            gap: ${gap}px;
            overflow: hidden;
            position: relative;
        ">
    `;

    for (const el of reglas.elementos) {
        html += renderizarElemento(el);
    }

    html += `</div>`;
    return html;
}

// ============================================================
// 4. GENERAR BANNERS DESDE EL FORMULARIO
// ============================================================

function generarBanners() {
    const datos = {
        vigencia: document.getElementById('vigencia').value || "15 MAY AL 20 MAY",
        logo_oferta: document.getElementById('logoOferta').value || "imagenes/logo_oferta_1.png",
        descuento_1: document.getElementById('descuento_1').value || "30%",
        cencopay_1: document.getElementById('cencopay_1').value || "15%",
        dinamica_1: document.getElementById('dinamica_1').value || "2x1",
        productos_1: document.getElementById('productos_1').value || "Vinos y espumantes",
        descuento_2: document.getElementById('descuento_2').value || "20%",
        cencopay_2: document.getElementById('cencopay_2').value || "10%",
        dinamica_2: document.getElementById('dinamica_2').value || "3x2",
        productos_2: document.getElementById('productos_2').value || "Leches saborizadas",
        legales: document.getElementById('legales').value || "Términos y condiciones aplican"
    };

    const selector = document.getElementById('selectorBanner');
    const seleccion = selector.value;

    let bannersAGenerar = [];
    if (seleccion === 'todas') {
        bannersAGenerar = Object.values(banners);
    } else {
        bannersAGenerar = [banners[seleccion]];
    }

    const contenedor = document.getElementById('contenedorBanners');
    contenedor.innerHTML = '';

    for (const banner of bannersAGenerar) {
        const html = renderizarBanner(datos, banner);

        const div = document.createElement('div');
        div.className = 'banner-item';
        div.innerHTML = `
            <div class="banner-header">
                <strong>📐 ${banner.nombre}</strong>
                <button onclick="descargarBanner('${banner.id}')">⬇️ Descargar JPG</button>
            </div>
            <div class="banner-preview" id="banner-${banner.id}">
                ${html}
            </div>
            <hr>
        `;
        contenedor.appendChild(div);
    }

    document.getElementById('resultados').style.display = 'block';
    document.getElementById('btnDescargarTodos').style.display = 'inline-block';

    window.bannersGenerados = bannersAGenerar;
}

// ============================================================
// 5. DESCARGAR
// ============================================================

function descargarBanner(id) {
    const elemento = document.getElementById(`banner-${id}`);
    if (!elemento) return;

    html2canvas(elemento, {
        scale: 2,
        useCORS: true,
        backgroundColor: null
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `${id}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.click();
    });
}

function descargarTodos() {
    const bannersList = window.bannersGenerados || [];
    if (bannersList.length === 0) {
        alert('Primero genera los banners');
        return;
    }

    for (let i = 0; i < bannersList.length; i++) {
        setTimeout(() => {
            descargarBanner(bannersList[i].id);
        }, i * 500);
    }
}

// ============================================================
// 6. EVENTOS
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btnGenerar').addEventListener('click', generarBanners);
    document.getElementById('btnDescargarTodos').addEventListener('click', descargarTodos);

    // Generar ejemplo al cargar
    setTimeout(generarBanners, 500);
});
