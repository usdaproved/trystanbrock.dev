// (C) Copyright 2020 by Trystan Brock All Rights Reserved.
import React from "react";
import { Link, graphql } from "gatsby";
import Layout from '../layout';

export default function Home({ data }) {
  let projects = data.allMarkdownRemark.edges.filter(({ node }) => node.frontmatter.category.includes('project'));
  let blogs = data.allMarkdownRemark.edges.filter(({ node }) => node.frontmatter.category.includes('blog'));

  return (
  <Layout>
    <header className="flex flex-col ml-5 md:ml-16 m-20">
      <h1 className="font-semibold text-4xl tracking-tight">Trystan Brock</h1>
      <h5 className="ml-3 font-mono text-xl font-thin text-gray-700">— Web Developer</h5>
    </header>
    <div className="ml-5 mr-5 mb-10 max-w-5xl text-lg">
      I am looking for work, email me@trystanbrock.dev
    </div>
    <main className="ml-5">
      <h1 className="font-semibold text-2xl">Projects</h1>
      <article className="flex flex-col flex-wrap md:flex-row mt-4">
      {
      projects.map(({ node }) => (
      <article key={node.id} className="mb-8 md:mr-16">
        <Link to={node.fields.slug}>
          <span className="text-xl underline hover:no-underline">{node.frontmatter.title}</span><span className="text-gray-700">{" "} — {node.frontmatter.date}</span>
          <p className="font-thin">{node.frontmatter.excerpt}</p>
          <div className="flex-row space-x-4">
            {node.frontmatter.tags.map((tag, index) => (
              <span key={node.id + `-tag-` + index} className="text-sm text-gray-700">{`${tag}`}</span>
            ))}
          </div>
        </Link>
      </article>
      )
      )
     }
    </article>
    <h1 className="font-semibold text-2xl">Blogs</h1>
      <article className="flex flex-col flex-wrap md:flex-row mt-4">
      {
      blogs.map(({ node }) => (
      <article key={node.id} className="mb-8 md:mr-16">
        <Link to={node.fields.slug}>
          <span className="text-xl underline hover:no-underline">{node.frontmatter.title}</span><span className="text-gray-700">{" "} — {node.frontmatter.date}</span>
          <p className="font-thin">{node.frontmatter.excerpt}</p>
          <div className="flex-row space-x-4">
            {node.frontmatter.tags.map((tag, index) => (
              <span key={node.id + `-tag-` + index} className="text-sm text-gray-700">{`${tag}`}</span>
            ))}
          </div>
        </Link>
      </article>
      )
      )
     }
    </article>
    </main>
  </Layout>
  );
}

export const query = graphql`
  query IndexPage {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            excerpt
            tags
            category
          }
          fields {
            slug
          }
        }
      }
    }
  }
`