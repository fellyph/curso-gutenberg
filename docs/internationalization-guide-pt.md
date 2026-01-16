# Guia de Internacionalização (i18n) - Curso Gutenberg

Este guia explica como implementar e gerenciar a internacionalização em blocos WordPress Gutenberg, especificamente para o projeto "Meu Primeiro Block".

## 📚 Índice

1. [Visão Geral](#visão-geral)
2. [Configuração do Projeto](#configuração-do-projeto)
3. [Adicionando Strings Traduzíveis](#adicionando-strings-traduzíveis)
4. [Gerenciando Arquivos de Tradução](#gerenciando-arquivos-de-tradução)
5. [Testando Traduções](#testando-traduções)
6. [Melhores Práticas](#melhores-práticas)
7. [Solução de Problemas](#solução-de-problemas)

## Visão Geral

A internacionalização (i18n) permite que seus blocos WordPress sejam traduzidos para vários idiomas, tornando-os acessíveis a um público global. Este projeto suporta:

- **Português (Brasil)** - Idioma original
- **Inglês (EUA)** - Idioma internacional principal
- **Espanhol (Espanha)** - Idioma internacional secundário

## Configuração do Projeto

### Estrutura de Arquivos

A configuração completa de i18n inclui:

```
curso-gutenberg/
├── languages/                          # Diretório de arquivos de tradução
│   ├── meu-primeiro-block.pot          # Arquivo modelo
│   ├── meu-primeiro-block-en_US.po     # Traduções em inglês
│   ├── meu-primeiro-block-en_US-hash.json # Inglês para JavaScript
│   ├── meu-primeiro-block-es_ES.po     # Traduções em espanhol
│   ├── meu-primeiro-block-es_ES-hash.json # Espanhol para JavaScript
│   └── README.md                       # Diretrizes de tradução
├── src/                                # Código fonte do bloco
│   ├── index.js                       # Registro do bloco com i18n
│   ├── edit.js                        # Componente editor com i18n
│   └── save.js                        # Componente save com i18n
├── meu-primeiro-block.php             # Arquivo PHP do plugin com configuração i18n
├── block.json                         # Metadados do bloco com textdomain
└── package.json                       # Scripts npm para fluxo de trabalho i18n
```

### Scripts NPM

O `package.json` inclui estes scripts de gerenciamento i18n:

```json
{
  "scripts": {
    "i18n:pot": "wp i18n make-pot . languages/meu-primeiro-block.pot --exclude=node_modules,vendor,build",
    "i18n:po": "wp i18n make-po languages/meu-primeiro-block.pot languages/",
    "i18n:json": "wp i18n make-json languages/ --no-purge",
    "i18n:update": "npm run i18n:pot && npm run i18n:po && npm run i18n:json"
  }
}
```

## Adicionando Strings Traduzíveis

### JavaScript (Editor de Blocos)

Use a função `__()` de `@wordpress/i18n`:

```javascript
import { __ } from '@wordpress/i18n';

// Registro do bloco
registerBlockType('curso-gutenberg/meu-primeiro-block', {
    title: __('Meu Primeiro Block', 'meu-primeiro-block'),
    description: __(
        'Exemplo de bloco escrito com padrão ESNext e suporte a JSX – passo de build necessário.',
        'meu-primeiro-block'
    ),
    // ... outras propriedades
});

// Em componentes React
export default function Edit() {
    return (
        <p {...useBlockProps()}>
            {__(
                'Meu Primeiro Block – Olá Curso Gutenberg !!!',
                'meu-primeiro-block'
            )}
        </p>
    );
}
```

### PHP (Lado do Servidor)

Use as funções i18n do WordPress:

```php
// Tradução simples
$message = __('Você precisa executar `npm start` ou `npm run build` primeiro.', 'meu-primeiro-block');

// Imprimir tradução
_e('Nome do Plugin', 'meu-primeiro-block');

// Formas plurais
_n('Um item', '%d itens', $count, 'meu-primeiro-block');

// Com contexto
_x('Post', 'substantivo', 'meu-primeiro-block');
```

### Metadados do Bloco (block.json)

A propriedade `textdomain` habilita a tradução:

```json
{
    "textdomain": "meu-primeiro-block",
    "title": "Meu Primeiro Block",
    "description": "Exemplo de bloco escrito com ESNext standard e suporte a JSX"
}
```

## Gerenciando Arquivos de Tradução

### 1. Gerar Modelo POT

Criar ou atualizar o modelo de tradução:

```bash
npm run i18n:pot
```

Isso verifica todos os arquivos PHP e JavaScript por strings traduzíveis.

### 2. Atualizar Arquivos PO

Atualizar arquivos de tradução existentes com novas strings:

```bash
npm run i18n:po
```

### 3. Gerar Arquivos JSON

Criar arquivos de tradução JavaScript:

```bash
npm run i18n:json
```

### 4. Fluxo de Trabalho Completo

Atualizar todos os arquivos de tradução de uma vez:

```bash
npm run i18n:update
```

## Testando Traduções

### Ambiente WordPress Local

1. **Instalar o plugin** no WordPress
2. **Alterar idioma** em Configurações > Geral > Idioma do Site
3. **Testar no editor de blocos**:
   - Procurar o bloco pelo nome traduzido
   - Verificar se a descrição do bloco está traduzida
   - Verificar se todos os elementos da UI usam strings traduzidas
4. **Testar no frontend**:
   - Criar um post com o bloco
   - Visualizar o post para verificar traduções do frontend

### Usando WordPress Playground

```bash
# Iniciar o playground
npm run playground:start

# No admin do WordPress:
# 1. Ir para Configurações > Geral
# 2. Alterar "Idioma do Site" para seu idioma alvo
# 3. Testar a funcionalidade do bloco
```

## Melhores Práticas

### 1. Extração de Strings

✅ **Faça:**
- Use funções i18n para todo texto voltado ao usuário
- Inclua contexto significativo quando strings podem ser ambíguas
- Mantenha strings completas e legíveis

❌ **Não faça:**
- Concatenar strings traduzidas
- Incluir variáveis dentro de strings traduzidas
- Quebrar frases em múltiplas chamadas de tradução

### 2. Qualidade da Tradução

✅ **Faça:**
- Forneça contexto para tradutores
- Use terminologia consistente
- Considere diferenças culturais
- Teste traduções em contextos reais da UI

❌ **Não faça:**
- Use ferramentas de tradução automática sem revisão
- Ignore restrições de espaço da UI
- Esqueça de traduzir mensagens de erro e texto de ajuda

## Recursos

### Documentação WordPress
- [Internacionalização de Plugins](https://developer.wordpress.org/plugins/internationalization/)
- [Internacionalização JavaScript](https://developer.wordpress.org/block-editor/how-to-guides/internationalization/)
- [Comandos WP-CLI i18n](https://developer.wordpress.org/cli/commands/i18n/)

### Ferramentas
- [Poedit](https://poedit.net/) - Editor de tradução
- [WP-CLI](https://wp-cli.org/) - Interface de linha de comando
- [GlotPress](https://glotpress.blog/) - Plataforma de tradução baseada na web

### Comunidade
- [WordPress Polyglots](https://make.wordpress.org/polyglots/) - Equipe de tradução
- [Translate WordPress](https://translate.wordpress.org/) - Plataforma oficial de tradução

---

**Próximos Passos:**
- Siga este guia para adicionar novas strings traduzíveis
- Configure fluxo de trabalho de tradução para novos idiomas
- Contribua para a comunidade de tradução do WordPress