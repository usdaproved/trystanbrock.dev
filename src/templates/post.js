// (C) Copyright 2020 by Trystan Brock All Rights Reserved.
import React, { Component } from "react";
import Helmet from 'react-helmet';
import { Link, graphql } from "gatsby";
import Layout from '../layout';

export default class PostTemplate extends Component {
  render() {
    const postNode = this.props.data.markdownRemark;
    const post = postNode.frontmatter;
    return (
    <Layout>
      <Helmet>
        <title>{`${post.title} – Trystan Brock`}</title>
      </Helmet>
      <header className="flex flex-col ml-5 md:ml-16 m-20">
      <Link to='/'>
      <h1 className="font-semibold text-4xl tracking-tight">{post.title}</h1>
      <h5 className="ml-3 font-mono text-xl font-thin text-gray-700">{`— `}{post.excerpt}</h5>
      </Link>
      </header>
      <article className="post ml-5 mr-5 mb-10 max-w-5xl text-lg" dangerouslySetInnerHTML={{ __html: postNode.html}}></article>
    </Layout>
  )
  }
}

export const query = graphql`
query BlogPostBySlug($slug: String!) {
  markdownRemark(fields: { slug: { eq: $slug } }) {
    frontmatter {
      title
      date
      excerpt
    }
    html
  }
}
`