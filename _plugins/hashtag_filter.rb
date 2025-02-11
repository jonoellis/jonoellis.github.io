module Jekyll
  module HashtagFilter
    def link_hashtags(input)
      input.gsub(/#(\w+)/) do |match|
        "<a href='/discover.html?q=%23#{$1}' class='hashtag'>#{match}</a>"
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::HashtagFilter)
