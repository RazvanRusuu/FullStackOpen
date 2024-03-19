const { startStandaloneServer } = require("@apollo/server/standalone");
const { ApolloServer } = require("@apollo/server");
const { GraphQLError } = require("graphql");
const { v1: uuid } = require("uuid");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title:String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthorYear(
            name: String!
            setBornTo: Int!
        ): Author
    }

    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int!
    }

    type Book {
        title: String!
        published: Int!
        author: String!
        id: ID!
        genres: [String!]!
    }


`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre) return books;

      let filteredBook = [...books];

      if (args.author)
        filteredBook = filteredBook.filter((b) => b.author === args.author);

      if (args.genre) {
        filteredBook = filteredBook.filter((b) =>
          b.genres.includes(args.genre)
        );
      }

      return filteredBook;
    },
    allAuthors: () => authors,
  },
  Mutation: {
    addBook: (root, args) => {
      if (!args.title && !args.author && !args.published && !args.genres) {
        throw new GraphQLError("Fields are mandatory", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: "",
          },
        });
      }
      const existingAuthor = authors.find((a) => a.name === args.author);
      if (!existingAuthor)
        authors = [...authors, { name: args.author, id: uuid() }];

      const newBook = { ...args, id: uuid() };
      books = [...books, newBook];
      return newBook;
    },
    editAuthorYear: (root, args) => {
      if (!args.name) return;

      const author = authors.find((a) => a.name === args.name);

      if (!author) return;

      const updatedAuthor = { ...author, born: args.setBornTo };

      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a));

      return updatedAuthor;
    },
  },
  Author: {
    bookCount: (root) => {
      return books.filter((b) => root.name === b.author).length;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => console.log(`Server started at ${url}`));
