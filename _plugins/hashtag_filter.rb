module Jekyll
  module HashtagFilter
    def hashtags(input)
      input.gsub(/#(\w+)/, '<a href="https://ellis.scot/discover.html?q=%23\1">#\1</a>')
    end
  end
end

Liquid::Template.register_filter(Jekyll::HashtagFilter)
