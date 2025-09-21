# Changelog

## 🚀 ATUALIZAÇÃO: WordPress Gutenberg Block API Version 3

Este projeto foi atualizado para usar WordPress Gutenberg Block API Version 3.

### Principais mudanças incluem:

- Atualização do `apiVersion` de 2 para 3 no block.json
- Simplificação do registerBlockType para usar metadados do block.json
- Modernização do registro de blocos no PHP para usar block.json
- Melhor separação entre metadados (block.json) e lógica (JavaScript)

### Benefícios da API Version 3:

1. **Melhor Separação de Responsabilidades**: Metadados do bloco vivem no `block.json`, JavaScript lida apenas com funcionalidade
2. **Código Mais Limpo**: Chamadas de registro simplificadas são mais fáceis de ler e manter
3. **Padrões Modernos**: Segue as melhores práticas atuais de desenvolvimento de blocos WordPress
4. **Fonte Única de Verdade**: Toda configuração do bloco centralizada em um arquivo

Esta atualização mantém total compatibilidade com versões anteriores enquanto moderniza a base de código para melhor manutenibilidade e alinhamento com os padrões do WordPress 6.0+.