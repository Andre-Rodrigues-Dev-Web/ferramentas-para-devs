import { FC } from "react";
import { Link } from "react-router-dom";
import MarketingLayout from "../../landing/ui/MarketingLayout";
import { Title, ContentWrapper } from "../../landing/ui/LandingPage.styles";
import {
  PageHeader,
  BlogGrid,
  BlogPost,
  PostDate,
  PostTitle,
  PostExcerpt,
  Tag,
} from "./BlogPage.styles";
import { BLOG_POSTS } from "../data/mockData";

const BlogPage: FC = () => {
  return (
    <MarketingLayout
      title="Blog & Novidades"
      description="Artigos, tutoriais e novidades sobre desenvolvimento web e o ecossistema DevToolkit."
    >
      <ContentWrapper>
        <PageHeader>
          <Title>
            Novidades do <span className="gradient-text">Toolkit</span>
          </Title>
        </PageHeader>

        <BlogGrid>
          {BLOG_POSTS.map((post) => (
            <Link
              to={`/blog/${post.slug}`}
              key={post.id}
              style={{ display: "block", textDecoration: "none" }}
            >
              <BlogPost>
                <PostDate>{post.date}</PostDate>
                <PostTitle>{post.title}</PostTitle>
                <PostExcerpt>{post.excerpt}</PostExcerpt>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </BlogPost>
            </Link>
          ))}
        </BlogGrid>
      </ContentWrapper>
    </MarketingLayout>
  );
};

export default BlogPage;
