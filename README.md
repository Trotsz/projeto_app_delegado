# projeto_app_delegado
Criação do app de demandas do delegado Ruchester

# Configuração do Banco de Dados

Esse projeto usa PostgreSQL 18 rodando no Docker via Docker Compose.

## Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado e rodando
- [Docker Compose](https://docs.docker.com/compose/) instalado (incluso no Docker Desktop)

---

## Configuração

Crie e edite o arquivo `.env` com suas credenciais:

```env
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha
```

> **Nunca commite o arquivo `.env`.** Está listado no `.gitignore` por padrão.

---

## Iniciando o banco de dados

```bash
docker compose up -d
```

Verifique se está rodando:

```bash
docker compose ps
```
As devidas informações do banco devem estar listadas em cada coluna.

Verifique se não ocorreu nenhum erro ao inicializar:

```bash
docker compose logs db
```
Se bem sucedido, o seguinte texto deve estar presente no final do log:

```
database system is ready to accept connections
```

---

## Conectando com o DBeaver

Assim que o container estiver rodando, abra o DBeaver e crie uma nova conexão PostgreSQL com:

| Campo    | Valor                       |
|----------|-----------------------------|
| Host     | `localhost`                 |
| Port     | `5432`                      |
| Username | valor de `POSTGRES_USER`    |
| Password | valor de `POSTGRES_PASSWORD`|

---

## Encerrando o banco de dados

```bash
# Interrompe os conteineres e mantém os dados
$ docker compose down

# Interrompe os conteineres e apaga todos os dados (início zerado)
$ docker compose down -v
```

---

## Notas

- Esse projeto utiliza PostgreSQL 18+, que armazena dados em `/var/lib/postgresql` ao invés de `/var/lib/postgresql/data`. Isso é uma mudança brusca das versões anteriores — não mude o caminho de montagem do volume.
- Os dados são persistidos num volume nomeado e gerenciado pelo Docker. Os dados são mantidos em reinicializações, a menos que seja executado `docker compose down -v`.