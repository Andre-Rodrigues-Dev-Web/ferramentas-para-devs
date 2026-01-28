import { useEffect, FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag as TagIcon, Twitter, Facebook, Linkedin } from 'lucide-react';
import MarketingLayout from '../../landing/ui/MarketingLayout';
import { ContentWrapper } from '../../landing/ui/LandingPage.styles';
import { BLOG_POSTS } from '../data/mockData';
import {
  Container,
  BackButton,
  Header,
  Meta,
  Title,
  TagsContainer,
  Tag,
  Content,
  ShareSection,
  ShareTitle,
  ShareButtons,
  ShareButton
} from './BlogPostPage.styles';

const BlogPostPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    if (!post) {
      navigate('/blog');
    }
  }, [post, navigate]);

  if (!post) return null;

  const shareUrl = window.location.href;
  const shareText = `Confira este artigo: ${post.title}`;

  return (
    <MarketingLayout title={post.title}>
      <ContentWrapper>
        <Container>
          <BackButton to="/blog">
            <ArrowLeft size={16} />
            Voltar para o Blog
          </BackButton>

          <Header>
            <Meta>
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                {post.date}
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <User size={14} />
                {post.author}
              </div>
            </Meta>
            
            <Title>{post.title}</Title>

            <TagsContainer>
              {post.tags.map(tag => (
                <Tag key={tag}>
                  #{tag}
                </Tag>
              ))}
            </TagsContainer>
          </Header>

          <Content dangerouslySetInnerHTML={{ __html: post.content }} />

          <ShareSection>
            <ShareTitle>Gostou? Compartilhe!</ShareTitle>
            <ShareButtons>
              <ShareButton 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Compartilhar no Twitter"
              >
                <Twitter size={18} />
              </ShareButton>
              
              <ShareButton 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Compartilhar no Facebook"
              >
                <Facebook size={18} />
              </ShareButton>
              
              <ShareButton 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Compartilhar no LinkedIn"
              >
                <Linkedin size={18} />
              </ShareButton>
            </ShareButtons>
          </ShareSection>
        </Container>
      </ContentWrapper>
    </MarketingLayout>
  );
};

export default BlogPostPage;
